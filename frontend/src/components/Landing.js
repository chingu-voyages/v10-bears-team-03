import React from 'react';
import startLogin from '../utils/startLogin';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div>
      <div className='landing-container'>
        <Navbar id='landing-container-navbar' />
        <Logo />
        <button onClick={startLogin}>Log In With Google</button>
      </div>
    </div>
  );
};

export default Landing;
