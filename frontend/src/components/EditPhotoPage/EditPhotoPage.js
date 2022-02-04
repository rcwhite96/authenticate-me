import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editPhoto, getGallery } from '../../store/galleries';

const EditNotebook = () => {
    const {photoId} = useParams()
    const sessionUser = useSelector((state => state.session.user))
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const gallery = useSelector((state => state.gallery[photoId]))
    const [imageURL, setImageURL] = useState(gallery?.title);

    useEffect(() => {
          dispatch(getGallery())
      }, [dispatch, photoId, imageURL])

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const notebook = await dispatch(editPhoto(photoId, imageURL)).catch(async (res) => {

          const data = await res.json();
          if (data && data.errors) {
            const filteredErrors = data.errors.filter(
              (error) => error !== 'Invalid value'
            );
            setErrors(filteredErrors);
          }
        });
        if (notebook) {
          return history.push('/gallery');
        }
      };

    return (
        <>
            <h2 className="edit-notebook-header">Edit Photo</h2>
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
                        placeholder="untitled notebook"
                        value={imageURL}/>
                    <button className='submit-button' type="submit">
                        Confirm
                    </button>

                </form>
        </>
    )
}

export default EditNotebook
