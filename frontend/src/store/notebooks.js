import { response } from "../../../backend/app"

const ADD_NOTEBOOK = 'notebook/addNotebook'
const REMOVE_NOTEBOOK = 'notebook/removeNotebook'


const addNotebooks = payload => {
    return {
        type: ADD_NOTEBOOK,
        payload
    }
}


export const getAllNotebooks = () => async dispatch => {
    const res = await fetch('/api/notebooks')
    if(res.ok) {
        const data = await res.json()
        dispatch(getAllNotebooks(data.notebooks))
    }
}


export const addNotebook = notebook => async dispatch => {
    const res = await fetch('/api/notebooks')
    if(res.ok){
        const data = await res.json()
        dispatch(addNotebooks(data.notebook))
    }
}
