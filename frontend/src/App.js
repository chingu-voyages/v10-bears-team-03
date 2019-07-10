import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import AssetListContainer from './components/AssetListContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/assets' component={AssetListContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
