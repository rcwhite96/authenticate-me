import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotebook } from '../../store/notebooks';

import './notebooks.css'

function NotebooksList() {
    const notebooks = useSelector(state => Object.values(state.notebook));
    console.log(notebooks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])

//TypeError: cannot convert undefined or null into an object(line 9)

    return(
        <>
            <h2 className="notebook_title">Notebooks</h2>
                <div className="notebook-list">
                    {notebooks?.map(notebook => (
                        <div key={notebook.id}>
                            does this work?
                        </div>
                    ))}
                </div>
        </>
    )
}

export default NotebooksList









// const sessionUser= useSelector(state => state.session.user)
// if(!sessionUser) {
//     return <Redirect to='/'/>
// }
