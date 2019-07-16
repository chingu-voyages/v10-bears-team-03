import React, { Component } from 'react';
import '../src/styles/styles.scss';

import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Landing from './components/Landing';
import AssetsAndFormContainer from './components/AssetsAndFormContainer';

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/form' component={AssetsAndFormContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
