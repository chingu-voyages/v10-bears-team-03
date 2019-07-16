import { firebase, googleAuthProvider } from '../firebase/firebase';

const startLogin = () =>
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(`user: ${user}, token: ${token}`);
    });

export default startLogin;
