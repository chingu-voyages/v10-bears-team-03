import React, { Component } from 'react';
import '../src/styles/styles.scss';

import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Landing from './components/Landing';
import AssetsAndFormContainer from './components/AssetsAndFormContainer';
import EmailLoginPage from './components/EmailLoginPage';

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/form' component={AssetsAndFormContainer} />
          <Route exact path='/emaillogin' component={EmailLoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
