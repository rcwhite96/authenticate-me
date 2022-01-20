import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams} from 'react-router-dom'
import { getOneNotebook } from  '../../store/notebooks'
// import { getNotes } from "../../store/notes";



export default function OneNotebookPage(){
    let {notebookId} = useParams()
    let dispatch=useDispatch()
    let currentNotebook=useSelector(state => state.notebooks.id)
    console.log(currentNotebook, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    useEffect(() => {
        getOneNotebook(notebookId)
    }, [dispatch])

    const notes = currentNotebook?.Notes.map((note, index) =>
        <div key={index}>
            <div>{note.title}</div>
        </div>)

    return(
        <>
        <h2>helloooo{currentNotebook?.title}</h2>
            <div>{notes}</div>
        </>
    )
}
