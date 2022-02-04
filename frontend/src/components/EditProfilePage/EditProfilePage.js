import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editProfile } from '../../store/session';

const EditProfilePage = () => {
    const sessionUser = useSelector((state => state.session.user))
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(!sessionUser){
            dispatch(editProfile())
        }else{
            setUsername(sessionUser.username)
            setEmail(sessionUser.email)
        }
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const note = await dispatch(editProfile(username)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                const filteredErrors = data.errors.filter(
                  (error) => error !== 'Invalid value'
                );
                setErrors(filteredErrors);
              }
        })
        if(note) {
            return history.push('/profile')
        }
    }

    return (
        <>
            <h2 className="edit-notebook-header">Edit User</h2>
                <form onSubmit={handleSubmit} className="add-notebook-form">
                <div className="error-div">
                    <p className="user-form-errors">
                         {errors.map((error, i) => (
                            <span key={i}>{error}</span>
                        ))}
                    </p>
                 </div>
                    <input
                        onChange ={(e) => setUsername(e.target.value)}
                        name="title"
                        placeholder="username"
                        value={username}/>
                    <input
                        onChange ={(e) => setEmail(e.target.value)}
                        name="title"
                        placeholder="email"
                        value={email}/>
                    <button className='submit-button' type="submit">
                        Confirm
                    </button>

                </form>
        </>
    )
}


export default EditProfilePage
