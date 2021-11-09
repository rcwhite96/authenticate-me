import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotebook } from '../../store/notebooks';
import {NavLink} from 'react-router-dom'

import './notebooks.css'

function NotebooksList() {
    const notebooks = useSelector(state => state.notebooks?.notebooks);
    // console.log(notebooks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])
    // console.log("RW", notebooks)

    return(
        <>
            <h2 className="notebook_title">Notebooks</h2>
                <div className="notebook-list">
                    {notebooks?.map(({id, title}) => (
                        <NavLink className="notebooks-links" to="/notebooks/:id" key={id}>
                            {title}
                        </NavLink>
                        // console.log(notebooks)
                    ))}
                    <button className="add-notebook">
                        <NavLink to="/new-notebook">
                        Add a Notebook
                        </NavLink>
                    </button>
                </div>
        </>
    )
}

export default NotebooksList









// const sessionUser= useSelector(state => state.session.user)
// if(!sessionUser) {
//     return <Redirect to='/'/>
// }
