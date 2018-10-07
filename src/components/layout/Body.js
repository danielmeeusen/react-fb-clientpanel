import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './../../helpers/auth';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import AppNavbar from './AppNavbar';
import Dashboard from './Dashboard';
import AddClient from './../clients/AddClient';
import EditClient from './../clients/EditClient';
import ClientDetails from './../clients/ClientDetails';
import Login from './../auth/Login';
import Signup from '../auth/SignUp';
import Settings from './../settings/Settings';
import Account from './../settings/Account';

class Body extends Component {
  render() {
    const { darkTheme } = this.props.settings;

    const background = darkTheme ? '#151520' : '#e1e1eb';
    const text = darkTheme ? 'white' : 'black';

    const theme = darkTheme ? 'Dark' : 'Light';
    return (
      <Router>
        <div className={theme}>
          <Helmet>
            <style>{`body {
               background-color: ${background};
               color: ${text};
          }`}</style>
          </Helmet>
          <AppNavbar />
          <div className="cont">
            <div className="col-xl-8 col-md-10 col-sm-12 mx-auto">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
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
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/signup"
                  component={UserIsNotAuthenticated(Signup)}
                />
                <Route
                  exact
                  path="/account"
                  component={UserIsAuthenticated(Account)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(Body);
