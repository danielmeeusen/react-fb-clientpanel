import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavbar from './navs/AppNavbar';
import Routes from './Routes';

class Body extends Component {
  render() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    const theme = settings.darkTheme ? 'Dark' : 'Light';

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

export default Body;
