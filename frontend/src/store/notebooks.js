const ADD_NOTEBOOK = 'notebook/addNotebook'
const GET_ALL_NOTEBOOKS ='notebook/getAllNotebook'
// const REMOVE_NOTEBOOK = 'notebook/removeNotebook'


const getAllNotebooks = payload => {
    return{
        type: GET_ALL_NOTEBOOKS,
        payload
    }
}

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
    const res = await fetch('/api/notebooks')
    if(res.ok) {
        const data = await res.json()
        dispatch(getAllNotebooks(data.notebooks))
    }
}

export const addNotebook = notebook => async dispatch => {
    const res = await fetch('/api/notebooks', {
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
            newState={...state, [action.payload.id]: action.payload};
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
