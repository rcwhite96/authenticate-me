const {csrfFetch} = require('./csrf')
const ADD_NOTEBOOK = 'notebook/addNotebook'
const GET_ALL_NOTEBOOKS ='notebook/getAllNotebook'
const GET_ONE_NOTEBOOK = 'notebook/getOneNotebook'
const REMOVE_NOTEBOOK = 'notebook/remove'


const getAllNotebooks = payload => {
    return{
        type: GET_ALL_NOTEBOOKS,
        payload
    }
}

const getOneNotebook = notebook => ({
    type: GET_ONE_NOTEBOOK,
    notebook
})

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

export const getAllNotebook = () => async dispatch => {
    const res = await csrfFetch('/api/notebooks')
    if(res.ok) {
        const data = await res.json()
        // console.log(data)
        dispatch(getAllNotebooks(data))
    }
}

export const getOne = (id) => async dispatch =>{
    const res = await fetch(`/api/notebooks/notebooks/${id}`)
    if (res.ok){
        const notebook = await res.json()
        dispatch(getOneNotebook(notebook))
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
    }
}
export const deleteNotebook = id => async dispatch => {
    const res = await csrfFetch(`api/notebooks/${id}`, {
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
            newState={...state, [action.notebooks.id]: action.notebooks};
            return newState;
        case GET_ALL_NOTEBOOKS:
            newState.notebooks = action.payload
            return newState
        case REMOVE_NOTEBOOK:
            newState={...state}
            delete newState[action.notebookId]
            return newState
    default:
        return state
    }
}

export default notebookReducer
