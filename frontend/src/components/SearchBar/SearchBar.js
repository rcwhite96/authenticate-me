import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import {noteSearch} from "../../store/notes"

import './SearchBar.css'

export default function SearchForm(){
    const [term, setTerm] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser= useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(noteSearch(term))
        if(term.length > 0){
            history.push(`/search/${term}`)
        }
    }, [term, history, dispatch])
    
    if(!sessionUser) {
        return <Redirect to='/'/>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(noteSearch(term))
        history.push(`/search/${term}`)
    }

    return(
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                className="search-input"
                placeholder="search notes"
                value={term}
                onChange={(e) => setTerm(e.target.value)}/>
                <button className='search-btn' type='submit'>Search</button>
            </form>
        </div>
    )

}
