import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { addPhoto } from '../../store/galleries';

import '../CreateNotebooks/notebookform.css'

const AddPhotoPage = () => {
    const sessionUser = useSelector((state => state.session.user))
    const [imageURL, setImageURL] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const notebook = await dispatch(addPhoto(imageURL)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            const filteredErrors = data.errors.filter(
              (error) => error !== 'Invalid value'
            );
            setErrors(filteredErrors);
          }
        });
        if (notebook) {
          return history.push('/notebooks');
        }
      };

    return (
        <>
            <h2 className="edit-notebook-header">Add a Photo</h2>
                <form onSubmit={handleSubmit} className="add-notebook-form">
                <div className="error-div">
                    <p className="user-form-errors">
                         {errors.map((error, i) => (
                            <span key={i}>{error}</span>
                        ))}
                    </p>
                 </div>
                    <input
                        onChange ={(e) => setImageURL(e.target.value)}
                        name="title"
                        placeholder="Image URL"
                        value={imageURL}/>
                    <button className='submit-button' type="submit">
                        Add
                    </button>
                </form>
        </>
    )
}

export default AddPhotoPage
