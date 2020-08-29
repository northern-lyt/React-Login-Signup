import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './signin';
import SignUp from './signup';
import Homepage from './homepage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

export class App extends React.Component {
  render() {
      return (
    <Router>
    <Switch>
    <Route path="/"  exact component={SignIn}></Route>
    <Route path="/signin"  exact component={SignIn}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/homepage" component={Homepage}></Route>
    </Switch>
    </Router>
  );
}
}
