import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const Landing = () => (
  <div>
    <div className='landing-container'>
      <Navbar id='landing-container-navbar' />

      <Logo />
      <button>Log In To Your Account</button>
      <Link to='#'>No Account? Create one here!</Link>
    </div>
  </div>
);

export default Landing;
