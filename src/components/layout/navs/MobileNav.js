import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setDarkTheme } from '../../../actions/settingsActions';

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

    const { photoURL } = this.props.auth;

    let navdrop = {};

    if (photoURL) {
      navdrop = {
        background: {
          backgroundImage: `url(${photoURL})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50px'
        },
        content: ''
      };
    } else {
      navdrop = {
        background: { backgroundColor: '!#ae64db' },
        content: this.getInitials(firstName, lastName)
      };
    }

    return (
      <nav className="navbar fixed-bottom navbar-expand navbar-dark">
        {isAuthenticated ? (
          <ul className="navbar-nav w-100 d-flex justify-content-between">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-envelope" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-bell" />
              </Link>
            </li>
            <li className="nav-item dropup position-static">
              <a
                className="dropdown-toggle btn text-light account-btn"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={navdrop.background}
              >
                {navdrop.content}
              </a>
              <div className="dropdown-menu w-100">
                <Link to="/account" className="dropdown-item">
                  <i className="fas fa-user" />
                  Account
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog" />
                  Settings
                </Link>
                <a className="dropdown-item" onClick={this.darkThemeChange}>
                  <i
                    className={darkTheme ? 'fas fa-moon' : 'far fa-moon'}
                    style={{ marginRight: '5%' }}
                  />
                  DarkTheme:{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {darkTheme ? 'ON' : 'OFF'}
                  </span>
                </a>
                <a
                  href="#!"
                  className="dropdown-item"
                  onClick={this.onLogoutClick}
                >
                  <i className="fas fa-sign-out-alt" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        ) : null}
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
