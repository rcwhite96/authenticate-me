const {csrfFetch} = require('./csrf')
const ADD_PHOTO = 'gallery/add'
const GET_GALLERY ='gallery/get'
const REMOVE_PHOTO = 'gallery/remove'
const UPDATE_PHOTO= 'gallery/edit'


const get = payload => {
    return{
        type: GET_GALLERY,
        payload
    }
}

const add = payload => {
    return {
        type: ADD_PHOTO,
        payload
    }
}

const remove = payload =>{
    return{type: REMOVE_PHOTO,
         payload
        }
}

const edit = payload => {
    return {
        type: UPDATE_PHOTO,
        payload
    }
}


export const getGallery = () => async dispatch => {
    const res = await csrfFetch('/api/gallery')
    if(res.ok) {
        const data = await res.json()
        dispatch(get(data))
    }
}

export const addPhoto = (imageURL) => async dispatch => {
    const res = await csrfFetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({imageURL})
    })
    if(res.ok){
        const data = await res.json()
        dispatch(add(data))
        return data
    }
}

export const editPhoto = (id, imageURL) => async (dispatch) => {
    const res = await csrfFetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({imageURL})
    })
    if(res.ok){
        const data = await res.json()
        dispatch(edit(data))
        return data
    }
}

export const deletePhoto = (id) => async dispatch => {
    const res = await csrfFetch(`/api/gallery/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(remove(id))
    }
}

let initialState = {gallery:[]}

const galleryReducer = (state = initialState, action) =>{
    let newState = {}
    switch(action.type) {
        case ADD_PHOTO:
            newState = {...state}
            newState.gallery.push(action.payload)
            return newState
        case GET_GALLERY:
            newState = {...state}
            newState.gallery = action.payload
            return newState
        case UPDATE_PHOTO:
            newState = {...state}
            const index = newState.gallery.findIndex(photo => photo.id === action.payload.id)
            newState.gallery[index] = action.payload
            newState.currentPhoto = action.payload
            return newState
        case REMOVE_PHOTO:
            newState={...state}
            delete newState[action.payload]
            return newState
    default:
        return state
    }
}

export default galleryReducer
