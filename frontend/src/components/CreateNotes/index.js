import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect} from 'react-router-dom';
import { addNote } from '../../store/notes';
import { getAllNotebook } from '../../store/notebooks';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import './noteform.css'

const CreateNote = () => {
    const sessionUser = useSelector((state => state.session.user))
    const notebooks = useSelector(state => Object.values(state.notebooks));
    console.log(notebooks)
    const [showNotebooks, setShowNotebooks] = useState('');
    // const {notebookId} = useParams()
    const [title, setTitle] = useState('');
    const [hookSize, setHookSize] = useState('')
    const [needleSize, setNeedleSize] = useState('')
    const [yarn, setYarn] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const updateNotebook = (e) => setShowNotebooks(e.target.value);

    useEffect(() => {
        dispatch(getAllNotebook())
    }, [dispatch])

    useEffect(() => {
        if (notebooks.length && !showNotebooks) {
            setShowNotebooks(notebooks[0].id);
        }
      }, [notebooks, showNotebooks]);
      console.log(notebooks)

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const note = await dispatch(addNote(showNotebooks, title, hookSize, needleSize, yarn, description)).catch(async (res) => {
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
            <h2 className="edit-notebook-header">Add a Note</h2>
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
                        placeholder="untitled notebook"
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
                    Notebook:
                    <select className="notebook-categories" onChange={updateNotebook} value={showNotebooks}>
                        {notebooks.map(notebook =>
                            <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                                )}
                    </select>
                    Description:
                    <div className="editor">
                        <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={(e, editor) => {
                            const data = editor.getData()
                            setDescription(data)
                        }}/>
                    </div>
                    <button className='note-submit-button' type="submit">
                        Add Note
                    </button>
                </form>
        </>

    )
}

export default CreateNote
