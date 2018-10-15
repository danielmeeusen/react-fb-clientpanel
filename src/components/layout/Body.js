import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavbar from './navs/AppNavbar';
import Routes from './Routes';

class Body extends Component {
  render() {
    const { darkTheme } = this.props.settings;

    const theme = darkTheme ? 'Dark' : 'Light';

    return (
      <Router>
        <div className={theme}>
          <AppNavbar />
          <Routes />
        </div>
      </Router>
    );
  }
}

Body.propTypes = {
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(Body);
