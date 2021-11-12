import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editNote } from '../../store/notes';
// import './noteform.css'

const EditNote = () => {
    const { notebookId } = useParams()
    const sessionUser = useSelector((state => state.session.user))
    const notes = useSelector((state => state.notes[notebookId]))
    const [title, setTitle] = useState(notes.title);
    const [hookSize, setHookSize] = useState(notes.hookSize)
    const [needleSize, setNeedleSize] = useState(notes.needleSize)
    const [yarn, setYarn] = useState(notes.yarn)
    const [description, setDescription] = useState(notes.description)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const note = await dispatch(editNote(notebookId, title, hookSize, needleSize, yarn, description)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                const filteredErrors = data.errors.filter(
                  (error) => error !== 'Invalid value'
                );
                setErrors(filteredErrors);
              }
        })
        if(note) {
            return history.push('/notes')
        }
    }

    return (
        <>
            <h2 className="edit-notebook-header">Edit Note</h2>
                <form onSubmit={handleSubmit} className="add-notebook-form">
                <div className="error-div">
                    <p className="user-form-errors">
                         {errors.map((error, i) => (
                            <span key={i}>{error}</span>
                        ))}
                    </p>
                 </div>
                    Title:
                    <input
                        onChange ={(e) => setTitle(e.target.value)}
                        className="title-input"
                        value={title}/>
                    Hook Size:
                    <input
                        onChange ={(e) => setHookSize(e.target.value)}
                        className="hook"
                        placeholder="Hook size"
                        value={hookSize}/>
                    Needle Size:
                    <input
                        onChange ={(e) => setNeedleSize(e.target.value)}
                        className="needle"
                        placeholder="Needle size"
                        value={needleSize}/>
                    Yarn:
                    <input
                        onChange ={(e) => setYarn(e.target.value)}
                        className="yarn-input"
                        placeholder="Yarn"
                        value={yarn}/>
                    Description:
                    <textarea
                        onChange ={(e) => setDescription(e.target.value)}
                        className="description-input"
                        placeholder="Description"
                        value={description}/>
                    <button className='note-submit-button' type="submit">
                        Edit Note
                    </button>
                </form>
        </>

    )
}

export default EditNote
