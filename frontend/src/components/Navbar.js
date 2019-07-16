import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

export default function Navbar() {
  const startLogout = () => firebase.auth().signOut();

  return (
    <div className='navbar'>
      <Link to='#' className='navbar-link'>
        About
      </Link>
      <Link to='#' className='navbar-link'>
        Contact
      </Link>
      <Link to='#' className='navbar-link'>
        Help
      </Link>
      <Link to='#' className='navbar-link' onClick={startLogout}>
        Log Out
      </Link>
    </div>
  );
}
