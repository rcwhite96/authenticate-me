const {csrfFetch} = require('./csrf')
const ADD_NOTEBOOK = 'notebook/addNotebook'
const GET_ALL_NOTEBOOKS ='notebook/getAllNotebook'

const GET_ONE_NOTEBOOK = 'notebook/getOneNotebook'

// const REMOVE_NOTEBOOK = 'notebook/removeNotebook'


// const getAllNotebooks = payload => {
//     return{
//         type: GET_ALL_NOTEBOOKS,
//         payload
//     }
// }

const getOneNotebook = notebook => ({
    type: GET_ONE_NOTEBOOK,
    notebook
})

const addNotebooks = payload => {
    return {
        type: ADD_NOTEBOOK,
        payload
    }
}

// const removeNotebook = id =>{
//     return{type: REMOVE_NOTEBOOK,
//         payload: id }
// }

export const getAllNotebook = () => async dispatch => {
    const res = await csrfFetch('/api/notebooks')
    if(res.ok) {
        const data = await res.json()
        console.log(data)
        // dispatch(getAllNotebooks(data))
    }
}

export const getOne = (id) => async dispatch =>{
    const res = await fetch(`/api/notebooks/notebooks/${id}`)
    if (res.ok){
        const notebook = await res.json()
        dispatch(getOneNotebook(notebook))
    }
}

export const addNotebook = notebook => async dispatch => {
    const res = await fetch('/api/notebooks/notebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notebook)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(addNotebooks(data.notebook))
    }
}
// export const deleteNotebook = id => async dispatch => {
//     const res = await fetch(`api/notebooks/${id}`, {
//         method: 'DELETE'
//     })
//     if (res.ok){
//         dispatch(removeNotebook(id))
//     }
// }

const notebookReducer = (state = {}, action) =>{
    let newState = {}
    switch(action.type) {
        case ADD_NOTEBOOK:
            newState={...state, [action.payload.id]: action.notebook};
            return newState;
        case GET_ALL_NOTEBOOKS:
            action.notebook.forEach(notebook=>{
                newState[notebook.id] = notebook
            })
            return newState
    default:
        return state
    }
}

export default notebookReducer
