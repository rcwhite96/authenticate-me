const {csrfFetch} = require('./csrf')

const GET_PROFILE = 'profile/get'

const get = payload => {
    return {
        type: GET_PROFILE,
        payload
    }
}

export const getProfile = (id) => async dispatch =>{
    const res = await csrfFetch(`/api/users/`)
    if (res.ok){
        const data = await res.json()
        dispatch(get(data))
        return data
    }
}


const profileReducer = (state={}, action) => {
    let newState = {}
    switch(action.type){
        case GET_PROFILE:
            newState = {...state}
            newState.profile = action.payload
            return newState
    default:
        return state
    }
}

export default profileReducer
