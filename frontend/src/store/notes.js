const {csrfFetch} = require('./csrf')

const ADD_NOTE = 'note/addNote'
const GET_NOTES = 'note/getNotes'
const UPDATE_NOTE = 'note/editNote'
const REMOVE_NOTE = 'note/removeNote'


const get = payload => {
    return {
        type: GET_NOTES,
        payload
    }
}

const add = payload => {
    return {
        type: ADD_NOTE,
        payload
    }
}

const update = payload => {
    return {
        type: UPDATE_NOTE,
        payload
    }
}

const remove = payload => {
    return {
        type: REMOVE_NOTE,
        payload
    }
}

export const getNotes = () => async dispatch => {
    const res = await csrfFetch('/api/notes')
    if(res.ok){
        const data = await res.json()
        dispatch(get(data))
    }
}

export const addNote = (notebookId, title, hookSize, needleSize, yarn, description) => async dispatch => {
    const res = await csrfFetch(`/api/notes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({notebookId, title, hookSize, needleSize, yarn, description})
    })
    if(res.ok){
        const note = await res.json()
        dispatch(add(note))
        return note
    }
}

export const editNote = (id, title, hookSize, needleSize, yarn, description) => async dispatch => {
    const res = await csrfFetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, hookSize, needleSize, yarn, description})
    })
    if(res.ok){
        const note = await res.json()
        dispatch(update(note))
        return note
    }
}

export const removeNote = (id) => async dispatch => {
    const res = await csrfFetch(`/api/notes/${id}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(remove(id))
    }
}

const noteReducer = (state = {}, action) =>{
    let newState = {}
    switch(action.type) {
        case ADD_NOTE:
            newState={...state, [action.payload.id]: action.payload};
            return newState;
        case GET_NOTES:
            action.payload.forEach(note => {
                 newState[note.id] = note;
            })
            return newState;
        // case GET_ONE_NOTEBOOK:
        //     newState= {...state, [action.payload.id]: action.payload}
        //     return newState
        case UPDATE_NOTE:
            newState={...state, [action.payload.id]: action.payload}
            return newState
        case REMOVE_NOTE:
            newState={...state}
            delete newState[action.payload]
            return newState
    default:
        return state
    }
}

export default noteReducer
