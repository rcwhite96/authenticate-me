import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{NavLink, Redirect} from 'react-router-dom'
import { getNotes, removeNote } from  '../../store/notes'
import '../Notes/index'

export default function SearchResults(){
    let dispatch = useDispatch()
    let note = useSelector(state => state.notes)
    

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(removeNote(id))
    }

    const sessionUser= useSelector(state => state.session.user)
    if(!sessionUser) {
        return <Redirect to='/'/>
    }

    let notes

    if(note){
        notes = Object.values(note)
    }

    const res = notes?.map((searched, index) =>
        <NavLink key={index} to={`/notes/${searched.id}`}>
            <div className="notes-links">
                <div className="title">{searched.title}</div>
                <div className="hook-size">Hook Size: {searched.hookSize}</div>
                <div className="needle-size">Needle Size: {searched.needleSize}</div>
                <div className="yarn">Yarn: {searched.yarn}</div>
                <div className="description">{searched.description}</div>
                <NavLink to={`/edit-note/${searched.id}`} className='edit-note-link'>Edit</NavLink>
                <button onClick={() => handleDelete(searched)} className='delete-button'>
                    Delete
                </button>
            </div>
        </NavLink>
    )

    return (
        <div>
            <div className='notes_title'>Search Results</div>
            <div className='notes-list'>
                {res}
            </div>
        </div>
    )
}
