import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setDarkTheme } from '../../actions/settingsActions';

class MobileNav extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return {
        isAuthenticated: true
      };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  getInitials = (f, l) => {
    if (f) {
      return f.slice(0, 1) + l.slice(0, 1);
    } else {
      return null;
    }
  };

  darkThemeChange = () => {
    const { setDarkTheme } = this.props;
    setDarkTheme();
  };

  render() {
    const { firstName, lastName } = this.props.profile;

    const { darkTheme } = this.props.settings;

    const { isAuthenticated } = this.state;

    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <Link to="/" className="navbar-brand">
          ClientPanel
        </Link>
        <button
          className="dropdown-toggle btn shadow text-light account-btn"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {this.getInitials(firstName, lastName)}
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/" className="nav-link dropdown-item">
                  <i className="fas fa-home" />
                  Home
                </Link>
                <a href="#!" className="nav-link dropdown-item">
                  <i className="fas fa-user" />
                  Account
                </a>
                <Link to="/settings" className="nav-link dropdown-item">
                  <i className="fas fa-cog" />
                  Settings
                </Link>
                <a
                  className="nav-link dropdown-item"
                  onClick={this.darkThemeChange}
                >
                  <i
                    className="fas fa-toggle-on"
                    style={{ marginRight: '5%' }}
                  />
                  DarkTheme:{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {darkTheme ? 'ON' : 'OFF'}
                  </span>
                </a>
                <a
                  href="#!"
                  className="nav-link dropdown-item"
                  onClick={this.onLogoutClick}
                >
                  <i className="fas fa-sign-out-alt" />
                  Logout
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

MobileNav.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setDarkTheme: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      auth: state.firebase.auth,
      settings: state.settings,
      profile: state.firebase.profile
    }),
    { setDarkTheme }
  )
)(MobileNav);
