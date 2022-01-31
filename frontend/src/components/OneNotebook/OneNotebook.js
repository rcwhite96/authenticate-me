import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams} from 'react-router-dom'
import { getOneNotebook } from  '../../store/notebooks'
import {getNotes} from '../../store/notes'
import NotesList from '../Notes/index'

export default function OneNotebookPage(){
    let {id} = useParams()
    let dispatch=useDispatch()
    let currentNotebook=useSelector(state => state.notebooks)
    console.log(currentNotebook)

    useEffect(() => {
        getOneNotebook(id)
    }, [dispatch, id])

    // const notes = currentNotebook?.NotesList.map((note, index) =>
    //     <div key={index}>
    //         <NotesList />
    //         <div>{note.title}</div>
    //     </div>)

    const notes = currentNotebook && Object.values(currentNotebook).map(({id, title, hookSize, needleSize, yarn, description}) => (
        <div className="notes-links" key={id}>
            <div className="title">
                {title}
            </div>
        </div>
        ))

    return(
        <>
        {/* <h2>{currentNotebook.title}</h2> */}
        <div className="notes-list"></div>
        <div>{notes}</div>
        </>
    )
}
