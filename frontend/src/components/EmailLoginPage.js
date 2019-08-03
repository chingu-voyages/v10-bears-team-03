import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { withFirebase } from '../firebase/context';

const EmailLoginPageBase = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [message, setMessage] = useState();
  const [accountExists, setAccountExists] = useState(true);

  const startEmailLogin = e => {
    e.preventDefault();
    props.firebase
      .loginWithEmailAndPassword(email, password)
      .then(() => props.history.push('/form'))
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
      return setMessage('Passwords do not match');
    } else {
      props.firebase
        .createNewAccount(email, password)
        .then(user => {
          props.history.push('/form');
        })
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

  const passwordReset = e => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
    } else {
      props.firebase
        .sendPasswordResetEmail(email)
        .then(function() {
          setMessage(
            'A password reset link has been sent.  Please check your e-mail.'
          );
        })
        .catch(function(error) {
          // An error happened.
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
              setMessage('');
            }}
            required
          />
          <input
            className='email-form-input'
            type='password'
            onChange={e => {
              setPassword(e.target.value);
              setMessage('');
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
                setMessage('');
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

          <button id='password-reset-button' onClick={passwordReset}>
            To reset password, enter e-mail address and click here.
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const EmailLoginPage = withFirebase(EmailLoginPageBase);

export default EmailLoginPage;
