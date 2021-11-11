import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotebook, deleteNotebook, editNotebook } from '../../store/notebooks';
import {NavLink, Redirect, useHistory} from 'react-router-dom'

import './notebooks.css'

function NotebooksList() {
    const notebooks = useSelector(state => state.notebooks?.notebooks);
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteNotebook(id));
        history.push('/notebooks')

      };

    const handleEdit = (id) => {
        dispatch(editNotebook(id))
        history.push('/notebooks')
    }

    const sessionUser= useSelector(state => state.session.user)
    if(!sessionUser) {
        return <Redirect to='/'/>
    }

    return(
        <>
            <h2 className="notebook_title">Notebooks</h2>
                <div className="notebook-list">
                    {notebooks?.map(({id, title}) => (
                        <NavLink className="notebooks-links" to={`/notebooks/${id}`} key={id}>
                            {title}
                            <button onClick={() => handleEdit(id)} className='edit-button'>
                                <NavLink to={`/edit-notebook/${id}`} className='edit-form-link'>Edit</NavLink>
                            </button>
                            <button onClick={() => handleDelete(id)} className='delete-button'>
                                Delete
                            </button>
                        </NavLink>
                    ))}
                    <NavLink to="/new-notebook" className="add-notebook">
                        Add a Notebook
                    </NavLink>
                </div>
        </>
    )
}

export default NotebooksList
