import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { addNotebook } from '../../store/notebooks';

const createNotebook = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {title}
    }
    dispatch(addNotebook(payload))
}
