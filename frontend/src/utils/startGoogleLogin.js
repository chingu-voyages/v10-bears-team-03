import firebase from '../firebase/firebase';

const startGoogleLogin = () => {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(result => {
      // const token = result.credential.accessToken;
      const user = result.user;
      // console.log(user);
      // console.log(`user: ${user}, token: ${token}`);
    })
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log(errorMessage);
    });
};

export default startGoogleLogin;
