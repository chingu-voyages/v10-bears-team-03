import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  currentUserId = () =>
    this.auth.currentUser ? this.auth.currentUser.uid : null;
  currentUserEmail = () =>
    this.auth.currentUser ? this.auth.currentUser.email : null;

  loginWithGoogle = () => {
    const googleAuthProvider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(googleAuthProvider);
  };

  loginWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  createNewAccount = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  signOut = () => {
    this.auth
      .signOut()
      .then(() => console.log('signed out'))
      .catch(e => console.log('error logging out'));
  };
}

export default firebase;
