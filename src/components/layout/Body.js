import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavbar from './navs/AppNavbar';
import Routes from './Routes';

class Body extends Component {
  render() {
    const { isEmpty, isLoaded } = this.props.auth;
    const isAuthenticated = !isEmpty && isLoaded;

    const { darkTheme } = this.props.settings;
    const theme = darkTheme
      ? isAuthenticated
        ? 'Dark'
        : 'Light Splash'
      : isAuthenticated
        ? 'Light'
        : 'Light Splash';

    return (
      <Router>
        <div className={theme}>
          <AppNavbar />
          <div className="row">
            <div className="col-xl-8 col-md-10 col-sm-12 mt mx-auto">
              <Routes />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

Body.propTypes = {
  auth: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(Body);
