import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, removeNote } from '../../store/notes';
import {NavLink, Redirect} from 'react-router-dom'
import parse from 'html-react-parser';

import './notes.css'

function NotesList() {
    const notes = useSelector(state => state.notes)
    const dispatch = useDispatch()

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

    return (
        <>
            <h2 className="notes_title">Notes</h2>
                <div className="notes-list">
                    {notes && Object.values(notes).map(({id, title, hookSize, needleSize, yarn, description}) => (
                        <NavLink className="notes-links" to={`/notes/${id}`} key={id}>
                            <div className="title">
                                {title}
                            </div>
                            <div className="hook-size">
                                Hook Size: {hookSize}
                            </div>
                            <div className="needle-size">
                                Needle Size: {needleSize}
                            </div>
                            <div className="yarn">
                                Yarn: {yarn}
                            </div>
                            <div className="description">
                                {parse(description)}
                            </div>
                            <NavLink to={`/edit-note/${id}`} className='edit-note-link'>Edit</NavLink>
                            <button onClick={() => handleDelete(id)} className='delete-button'>
                                Delete
                            </button>
                        </NavLink>
                    ))}
                    <NavLink to="/new-note" className="add-note">
                        Add a Note
                    </NavLink>
                </div>
        </>
    )
}

export default NotesList
