import React from 'react';
import { firebase, googleAuthProvider } from '../firebase/firebase';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const Landing = () => {
  const startLogin = () => firebase.auth().signInWithPopup(googleAuthProvider);
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
