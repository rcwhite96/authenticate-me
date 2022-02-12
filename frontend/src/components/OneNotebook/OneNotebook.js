import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams, Redirect, NavLink, useHistory} from 'react-router-dom'
import { removeNote } from '../../store/notes';
import { getOneNotebook } from  '../../store/notebooks'
import parse from 'html-react-parser';


export default function OneNotebookPage(){
    let dispatch=useDispatch()
    let history = useHistory()
    const sessionUser = useSelector((state => state.session.user))
    let {id} = useParams()
    let currentNotebook=useSelector(state => state.notebooks.oneNotebook?.Notes)


    useEffect(() => {
        if(!currentNotebook){
            dispatch(getOneNotebook(id))
        }
    }, [dispatch,])


    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

      const handleDelete = async(id) => {
        await dispatch(removeNote(id))
        history.push(`/notebooks`)
    }

    return(
        <>
        <h2 className="notes_title">Notes</h2>
            <div className="notes-list">
            <NavLink to="/new-note" className="add-note">
                        Add a Note
            </NavLink>
                {currentNotebook && Object.values(currentNotebook).map(({id, title, hookSize, needleSize, yarn, description}) => (
                    <div className="notes-links" key={id}>
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
                        </div>
                ))}
            </div>
        </>
    )
}
