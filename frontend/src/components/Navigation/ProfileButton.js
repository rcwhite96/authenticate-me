import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useParams } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let {userId} = useParams()

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <NavLink to="/notebooks" className="notebooks">Notebooks</NavLink>
      <NavLink to="/notes">All Notes</NavLink>
      <span className="block"/>
      <NavLink exact to={`/profile`}><i className="far fa-user"/></NavLink>
      <button onClick={logout} className="logout-button">Log Out</button>
    </>
  );
}

export default ProfileButton;
