import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavbar from './navs/AppNavbar';
import Routes from './Routes';

class Body extends Component {
  render() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    const { darkTheme } = settings;

    console.log(darkTheme);

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

export default Body;
