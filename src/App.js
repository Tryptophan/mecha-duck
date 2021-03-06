import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './Home';
import Driver from './Driver';
import Commander from './Commander';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/driver' component={Driver} />
          <Route path='/commander' component={Commander} />
        </Switch>
      </div>
    );
  }
}

export default App;
