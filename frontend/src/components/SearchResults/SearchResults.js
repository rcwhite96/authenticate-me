import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{NavLink, Redirect} from 'react-router-dom'
import { getNotes, removeNote } from  '../../store/notes'
import '../Notes/index'

export default function SearchResults(){
    let dispatch = useDispatch()
    let note = useSelector(state => state.notes)
    console.log(note)

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

    const res = notes?.map((note, index) =>
        <NavLink key={index} to={`/notes/${note.id}`}>
            <div className="notes-links">
                <div className="title">{note.title}</div>
                <div className="hook-size">Hook Size: {note.hookSize}</div>
                <div className="needle-size">Needle Size: {note.needleSize}</div>
                <div className="yarn">Yarn: {note.yarn}</div>
                <div className="description">{note.description}</div>
                <NavLink to={`/edit-note/${note}`} className='edit-note-link'>Edit</NavLink>
                <button onClick={() => handleDelete(note)} className='delete-button'>
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
