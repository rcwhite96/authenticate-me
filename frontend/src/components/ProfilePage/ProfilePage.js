import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, Redirect, useParams} from 'react-router-dom'
import {restoreUser} from '../../store/session'

function ProfilePage(){
    const dispatch = useDispatch()
    const sessionUser = useSelector((state => state.session.user))
    console.log(sessionUser)
    let {userId} = useParams()
    console.log(sessionUser.id)

    useEffect(() => {
        dispatch(restoreUser())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const user = sessionUser.username
    const email = sessionUser.email

    return (
        <>
        <h2 className="notes_title">Hello, {user}!</h2>
        <div className="notes-list">
            <div className="title">{user}</div>
            <div className="yarn">{email}</div>
            <NavLink to={`/edit-profile/${sessionUser.id}`} className='add-notebook'>Edit</NavLink>
        </div>
        </>
    )
}

export default ProfilePage
