import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserIsNotAuthenticated } from './../../helpers/auth';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Login from './../auth/Login';
import Signup from '../auth/SignUp';

export class EmptyLayout extends Component {
  render() {
    return (
      
    );
  }
}

EmptyLayout.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(EmptyLayout);
