
import { NavLink } from 'react-router-dom';
// import {getOne} from '../../store/notebooks'

const NotebookDetail = ({id, title}) => {
    return (
        <li>
            <NavLink to={`/notebooks/${id}`}>{title}</NavLink>
        </li>
    )
}

export default NotebookDetail
