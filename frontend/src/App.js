import React, { useState } from 'react';
import '../src/styles/styles.scss';

import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { withFirebase } from './firebase/context';
import Landing from './components/Landing';
import AssetsAndFormContainer from './components/AssetsAndFormContainer';
import EmailLoginPage from './components/EmailLoginPage';
import AboutPage from './components/AboutPage';

import WindowDimensionsProvider from './components/WindowDimensionsProvider';
export const history = createBrowserHistory();

const AppBase = props => {
  const [isAuthed, setIsAuthed] = useState(false);

  props.firebase.auth.onAuthStateChanged(authUser => {
    authUser ? setIsAuthed(true) : setIsAuthed(false);
  });

  // const userId = props.firebase.currentUserId();
  // const userEmail = props.firebase.currentUserEmail();

  return (
    <WindowDimensionsProvider>
      <Router history={history} isAuthed={isAuthed}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/form'
            component={isAuthed ? AssetsAndFormContainer : Landing}
          />
          <Route exact path='/emaillogin' component={EmailLoginPage} />
          <Route exact path='/about' component={AboutPage} />>
        </Switch>
      </Router>
    </WindowDimensionsProvider>
  );
};

const App = withFirebase(AppBase);

export default App;
