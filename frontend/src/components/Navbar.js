import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
    </div>
  );
}
