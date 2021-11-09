import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotebook } from '../../store/notebooks';

import './notebooks.css'

function NotebooksList() {
    // const notebooks = useSelector(state => Object.values(state.notebook));
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])
    return(
        <>
            <h2 className="notebook_title">Notes</h2>
                <ul className="notebook-list">
            
                </ul>
        </>
    )
}

export default NotebooksList
