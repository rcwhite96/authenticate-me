const {csrfFetch} = require('./csrf')
const ADD_NOTEBOOK = 'notebook/addNotebook'
const GET_ALL_NOTEBOOKS ='notebook/getAllNotebook'
const GET_ONE_NOTEBOOK = 'notebook/getOneNotebook'
const REMOVE_NOTEBOOK = 'notebook/deleteNotebook'
const UPDATE_NOTEBOOK = 'notebook/editNotebook'


const getAllNotebooks = payload => {
    return{
        type: GET_ALL_NOTEBOOKS,
        payload
    }
}

const getOne = payload => {
    return{
        type: GET_ONE_NOTEBOOK,
        payload
    }
}

const add = payload => {
    return {
        type: ADD_NOTEBOOK,
        payload
    }
}

const remove = notebookId =>{
    return{type: REMOVE_NOTEBOOK,
         payload: notebookId }
}

const update = payload => {
    return {
        type: UPDATE_NOTEBOOK,
        payload
    }
}

export const getOneNotebook = (id) => async dispatch =>{
    const res = await fetch(`/api/notebooks/${id}`)
    if (res.ok){
        const data = await res.json()
        dispatch(getOne(data))
        return data
    }
}

export const getAllNotebook = () => async dispatch => {
    const res = await csrfFetch('/api/notebooks')
    if(res.ok) {
        const data = await res.json()
        dispatch(getAllNotebooks(data))
    }
}

export const addNotebook = (title) => async dispatch => {
    const res = await csrfFetch('/api/notebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
    })
    if(res.ok){
        const notebook = await res.json()
        dispatch(add(notebook))
        return notebook
    }
}

export const editNotebook = (id, title) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
    })
    if(res.ok){
        const notebook = await res.json()
        dispatch(update(notebook))

        return notebook
    }
}

export const deleteNotebook = (id) => async dispatch => {
    const res = await csrfFetch(`/api/notebooks/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(remove(id))
    }
}


const notebookReducer = (state = {}, action) =>{
    let newState = {}
    switch(action.type) {
        case ADD_NOTEBOOK:
            newState={...state, [action.payload.id]: action.payload};
            return newState;
        case GET_ALL_NOTEBOOKS:
            action.payload.forEach(notebook => {
                 newState[notebook.id] = notebook;
            })
            return newState;
        case UPDATE_NOTEBOOK:
            newState={...state, [action.payload.id]: action.payload}
            return newState
        case GET_ONE_NOTEBOOK:
            newState = {...state}
            newState.oneNotebook = action.payload
            return newState
        case REMOVE_NOTEBOOK:
            newState={...state}
            delete newState[action.payload]
            return newState
    default:
        return state
    }
}

export default notebookReducer
