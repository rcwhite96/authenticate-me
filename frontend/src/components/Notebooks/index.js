import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotebook, deleteNotebook } from '../../store/notebooks';
import {NavLink, Redirect} from 'react-router-dom'

import './notebooks.css'

function NotebooksList() {
    const notebooks = useSelector(state => state.notebooks);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteNotebook(id));
      };

    const sessionUser= useSelector(state => state.session.user)
    if(!sessionUser) {
        return <Redirect to='/'/>
    }

    return(
        <>
            <h2 className="notebook_title">Notebooks</h2>
                <div className="notebook-list">
                <div className="notebook-div">
                <NavLink to="/new-notebook" className="add-notebook">
                        Add a Notebook
                    </NavLink>
                    {notebooks && Object.values(notebooks).map(({id, title}) => (
                        <NavLink className="notebooks-links" to={`/notebooks/${id}`} key={id}>
                            {title}
                            <NavLink to={`/edit-notebook/${id}`} className='edit-form-link'>Edit</NavLink>
                            <button onClick={() => handleDelete(id)} className='delete-button'>
                                Delete
                            </button>
                        </NavLink>
                    ))}
                    </div>
                </div>
        </>
    )
}

export default NotebooksList
