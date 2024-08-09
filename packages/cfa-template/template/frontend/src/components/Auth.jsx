import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import CreateUserPage from '../pages/CreateUserPage.jsx';

const Auth = () => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/register" exact component={CreateUserPage} />
    <Redirect to="/" />
  </Switch>
);

export default Auth;
