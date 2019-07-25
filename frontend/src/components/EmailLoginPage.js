import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { firebase } from '../firebase/firebase';

export default function EmailLoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [accountExists, setAccountExists] = useState(true);

  const startEmailLogin = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const startCreateAccount = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setErrorMessage('Passwords do not match');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  };

  const displayCreateAccountForm = e => {
    setAccountExists(false);
    e.preventDefault();
    document.getElementById('create-account-button').style.display = 'none';
  };

  return (
    <div>
      <Navbar />
      <div className='email-login-form'>
        <form
          onSubmit={accountExists ? startEmailLogin : startCreateAccount}
          name='email'
        >
          <input
            className='email-form-input'
            type='email'
            placeholder='Please enter your email'
            onChange={e => {
              setEmail(e.target.value);
              setErrorMessage('');
            }}
            required
          />
          <input
            className='email-form-input'
            type='password'
            onChange={e => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
            placeholder={
              accountExists
                ? 'Please enter your password'
                : 'Please choose a password'
            }
            required
          />
          {!accountExists && (
            <input
              className='email-form-input'
              onChange={e => {
                setPasswordConfirm(e.target.value);
                setErrorMessage('');
              }}
              type='password'
              placeholder='Please re-enter your chosen password'
              required
            />
          )}
          <button type='submit' className='email-submit'>
            Submit
          </button>
          <button id='create-account-button' onClick={displayCreateAccountForm}>
            No account? Create one now.
          </button>
        </form>
        {errorMessage && <p>Passwords do not match</p>}
        {}
      </div>
    </div>
  );
}
