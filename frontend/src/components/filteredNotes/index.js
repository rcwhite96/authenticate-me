import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOneNotebook} from '../../store/notebooks';
import {removeNote } from '../../store/notes'
import {NavLink, Redirect} from 'react-router-dom'

function FilteredNotes() {
    const notes = useSelector(state => state.notes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneNotebook())
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
                                {description}
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


export default FilteredNotes
