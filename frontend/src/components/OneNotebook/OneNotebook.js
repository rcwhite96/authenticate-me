import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams} from 'react-router-dom'
import { getOneNotebook } from  '../../store/notebooks'
import NotesList from '../Notes/index'
// import { getNotes } from "../../store/notes";

export default function OneNotebookPage(){
    let {id} = useParams()
    let dispatch=useDispatch()
    let currentNotebook=useSelector(state => state.notebooks)
    console.log(currentNotebook)

    useEffect(() => {
        getOneNotebook(id)
    }, [dispatch, id])

    const notes = currentNotebook?.NotesList.map((note, index) =>
        <div key={index}>
            <NotesList title={note.title}/>
            <div>{note.title}</div>
        </div>)

    return(
        <>
        <h2>{currentNotebook?.title}hellooo</h2>
            <div>{notes}</div>
        </>
    )
}
