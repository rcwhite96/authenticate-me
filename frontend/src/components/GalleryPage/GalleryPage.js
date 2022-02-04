import React from 'react'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getGallery, deletePhoto } from '../../store/galleries';
import {NavLink, Redirect} from 'react-router-dom'
import './GalleryPage.css'

function GalleryPage(){
    const sessionUser = useSelector((state => state.session.user))
    const galleryPhotos = useSelector(state => state.gallery.gallery)
    console.log(galleryPhotos)
    const dispatch = useDispatch()

    const imgs = galleryPhotos?.map((galleryPhoto, index) =>
        <div key={index}>
            <div className="image-container">
                <img className="project-image" src={galleryPhoto.imageURL} alt="media-img"/>
                <div className="button-container">
                    <NavLink to={`/edit-photo/${galleryPhoto.id}`} className='edit-photo-link'>Edit</NavLink>
                    <button onClick={() => handleDelete(galleryPhoto.id)} className='edit-photo-link'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

    useEffect(() => {

        dispatch(getGallery())

    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/login" />;
      }

    const handleDelete = (id) => {
        dispatch(deletePhoto(id))
    }

    return (
        <>

        <h2 className="notebook_title">My Gallery</h2>
        <div className="button-container">
            <NavLink to="/new-photo" className="add-photo">
                        Add a Photo
            </NavLink>
        </div>
        <div className="photo-container">{imgs}</div>
    </>
    )
}

export default GalleryPage
