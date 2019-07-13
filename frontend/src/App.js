import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import AssetsAndFormContainer from './components/AssetsAndFormContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/form' component={AssetsAndFormContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
