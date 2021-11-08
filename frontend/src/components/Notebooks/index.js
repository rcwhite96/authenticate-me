
// import './notebooks.css'
import { useSelector } from 'react-redux';
import { getAllNotebook } from '../../store/notebooks';

function NotebooksList() {
    const arr = useSelector(getAllNotebook)
    return(
        <>
            <h2 className="notebook_title">Notes</h2>
            {!arr.length && <span>No notebooks. Create one to get started!</span>}
                <ul className="notebook-list">

                </ul>
        </>
    )
}

