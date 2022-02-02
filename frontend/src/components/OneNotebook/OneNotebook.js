import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams, Redirect, NavLink} from 'react-router-dom'
import { removeNote } from '../../store/notes';
import { getOneNotebook } from  '../../store/notebooks'
import parse from 'html-react-parser';


export default function OneNotebookPage(){
    let dispatch=useDispatch()
    const sessionUser = useSelector((state => state.session.user))
    let {notebookId} = useParams()
    let currentNotebook=useSelector(state => state.notebooks.oneNotebook?.Notes)
    console.log(currentNotebook)

    useEffect(() => {
        if(!currentNotebook){
            dispatch(getOneNotebook(notebookId))
        }
    }, [dispatch,])


    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

      const handleDelete = (id) => {
        dispatch(removeNote(id))
    }

    // const notebookArr = Object.values(currentNotebook)
    // console.log(notebookArr)

    // const notes = currentNotebook?.NotesList.map((note, index) =>
    //     <div key={index}>
    //         <NotesList />
    //         <div>{note.title}</div>
    //     </div>)

    // const notes = currentNotebook && Object.values(currentNotebook).map(({id, title}) => (
    //     <div className="notes-links" key={id}>
    //         <div className="title">

    //             {title}
    //         </div>
    //     </div>
    //     ))

    return(
        <>
        <h2 className="notes_title">Notes</h2>
            <div className="notes-list">
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
