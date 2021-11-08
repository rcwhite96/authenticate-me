import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNotebook } from '../../store/notebooks';

const CreateNotebook = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title
        }
        dispatch(addNotebook(payload))

        history.push(`/notebooks`)
    }

    return (
        <form onSubmit={handleSubmit} className="add-notebook">
            <input
                onChange ={(e) => setTitle(e.target.value)}
                value={title}/>
            <button className='submit-button' type="submit">
                Add Notebook
            </button>
        </form>
    )
}

export default CreateNotebook
