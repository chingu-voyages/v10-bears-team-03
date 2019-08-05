import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/context';

const NavbarBase = props => {
  const startLogout = () => props.firebase.signOut();
  const isAuthed = props.firebase.auth.currentUser;

  return (
    <div className='navbar'>
      {!isAuthed && (
        <Link to='/' className='navbar-link'>
          Home
        </Link>
      )}
      <Link to='/about' className='navbar-link'>
        About
      </Link>
      <Link to='/contact' className='navbar-link'>
        Contact
      </Link>
      {isAuthed && (
        <Link to='/form' className='navbar-link'>
          Equipment
        </Link>
      )}
      {isAuthed && (
        <Link to='#' className='navbar-link' onClick={startLogout}>
          Log Out
        </Link>
      )}
    </div>
  );
};

const Navbar = withFirebase(NavbarBase);

export default Navbar;
