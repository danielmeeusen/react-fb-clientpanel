import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Route, Switch } from 'react-router-dom';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './../../helpers/auth';

import Dashboard from './Dashboard';
import AddClient from './../clients/AddClient';
import EditClient from './../clients/EditClient';
import ClientDetails from './../clients/ClientDetails';
import Settings from './../settings/Settings';
import Account from './../settings/Account';

export class MainLayout extends Component {
  render() {
    return (
      
    );
  }
}

MainLayout.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(MainLayout);
