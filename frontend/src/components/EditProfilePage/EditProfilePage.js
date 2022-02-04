import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editProfile } from '../../store/session';

const EditProfilePage = () => {
    const sessionUser = useSelector((state => state.session.user))
    console.log("AAAAAAAAAAAAAAAAAAAAA")
    console.log(sessionUser.id)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { userId } = useParams()

    useEffect(() => {
        if(!sessionUser){
            dispatch(editProfile(sessionUser.id))
        }else{
            setUsername(sessionUser.username)
            setEmail(sessionUser.email)
        }
    }, [dispatch, sessionUser.id])

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors([]);
          return dispatch(editProfile(username, email, password, sessionUser.id))
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
      };

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
                 <label>
                     Username
                    <input
                        onChange ={(e) => setUsername(e.target.value)}
                        name="title"
                        placeholder="username"
                        value={username}/>
                    </label>
                    <label>
                        Email
                    <input
                        onChange ={(e) => setEmail(e.target.value)}
                        name="title"
                        placeholder="email"
                        value={email}/>
                    </label>
                    <label>
                       New Password
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Confirm Password
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </label>
                    <button className='submit-button' type="submit">
                        Confirm
                    </button>
                </form>
        </>
    )
}


export default EditProfilePage
