import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchForm from '../SearchBar/SearchBar';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="nav-bar">
      <div className="home">
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
        <div className="search-container">
            <SearchForm/>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
