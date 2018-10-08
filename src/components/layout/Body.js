import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavbar from './navs/AppNavbar';
import StyleHelmet from './StyleHelmet';
import Routes from './Routes';

class Body extends Component {
  render() {
    const { darkTheme } = this.props.settings;
    const theme = darkTheme ? 'Dark' : 'Light';

    return (
      <Router>
        <div className={theme}>
          <StyleHelmet />
          <AppNavbar />
          <div className="cont">
            <div className="col-xl-8 col-md-10 col-sm-12 mx-auto">
              <Routes />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

Body.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(Body);
