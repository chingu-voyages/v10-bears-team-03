import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { history } from './App';
import * as serviceWorker from './serviceWorker';
import firebase from '../src/firebase/firebase';
import FirebaseContext from '../src/firebase/context';

// ReactDOM.render(<App />, document.getElementById('root'));
let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <FirebaseContext.Provider value={new firebase()}>
        <App />
      </FirebaseContext.Provider>,
      document.getElementById('root')
    );
    hasRendered = true;
  }
};

renderApp();

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     renderApp();
//     history.push('/form');
//   } else {
//     renderApp();
//     history.push('/');
//   }
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
