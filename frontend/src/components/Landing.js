import React from 'react';
// import startGoogleLogin from '../utils/startGoogleLogin';
import { history } from '../App';
import { withFirebase } from '../firebase/context';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const LandingBase = props => {
  const loginWithGoogle = () => {
    props.firebase
      .loginWithGoogle()
      // .then(user => console.log(user.userId))

      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className='landing-container'>
      <Navbar />
      <Logo />
      <button onClick={loginWithGoogle}>Log In With Google</button>
      <button onClick={() => history.push('/emaillogin')}>
        Log In With Email
      </button>
    </div>
  );
};

const Landing = withFirebase(LandingBase);

export default Landing;
