import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editNotebook } from '../../store/notebooks';

const EditNotebook = () => {
    const {notebookId} = useParams()
    const sessionUser = useSelector((state => state.session.user))
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const notebook = await dispatch(editNotebook(notebookId, title)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            const filteredErrors = data.errors.filter(
              (error) => error !== 'Invalid value'
            );
            setErrors(filteredErrors);
          }
        });
        if (notebook) {
          console.log(notebook)
          history.push('/notebooks');
        }
      };

    return (
        <>
            <h2 className="edit-notebook-header">Edit Notebook</h2>
                <form onSubmit={handleSubmit} className="add-notebook-form">
                <div className="error-div">
                    <p className="user-form-errors">
                         {errors.map((error, i) => (
                            <span key={i}>{error}</span>
                        ))}
                    </p>
                 </div>
                    <input
                        onChange ={(e) => setTitle(e.target.value)}
                        name="title"
                        placeholder="untitled notebook"
                        value={title}/>
                    <button className='submit-button' type="submit">
                        Edit Notebook
                    </button>
                </form>
        </>
    )
}

export default EditNotebook

// git test
