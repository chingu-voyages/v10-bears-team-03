import React from 'react';
import { Link } from 'react-router-dom';
// import { firebase } from '../firebase/firebase';
import { withFirebase } from '../firebase/context';

const NavbarBase = props => {
  const startLogout = () => props.firebase.signOut();

  return (
    <div className='navbar'>
      <Link to='/about' className='navbar-link'>
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
};

const Navbar = withFirebase(NavbarBase);

export default Navbar;
