import React from 'react';
import startGoogleLogin from '../utils/startGoogleLogin';
import { history } from '../App';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div>
      <div className='landing-container'>
        <Navbar id='landing-container-navbar' />
        <Logo />
        <button onClick={startGoogleLogin}>Log In With Google</button>
        <button onClick={() => history.push('/emaillogin')}>
          Log In With Email
        </button>
      </div>
    </div>
  );
};

export default Landing;
