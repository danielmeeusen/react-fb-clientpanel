import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './../../helpers/auth';

import Dashboard from './Dashboard';
import AddClient from './../clients/AddClient';
import EditClient from './../clients/EditClient';
import ClientDetails from './../clients/ClientDetails';
import Login from './../auth/Login';
import Signup from '../auth/SignUp';
import Settings from './../settings/Settings';
import Account from './../settings/Account';
import NotFound from './NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
        <Route
          exact
          path="/client/add"
          component={UserIsAuthenticated(AddClient)}
        />
        <Route
          exact
          path="/client/edit/:id"
          component={UserIsAuthenticated(EditClient)}
        />
        <Route
          exact
          path="/client/:id"
          component={UserIsAuthenticated(ClientDetails)}
        />
        <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
        <Route
          exact
          path="/signup"
          component={UserIsNotAuthenticated(Signup)}
        />
        <Route exact path="/account" component={UserIsAuthenticated(Account)} />
        <Route
          exact
          path="/settings"
          component={UserIsAuthenticated(Settings)}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
