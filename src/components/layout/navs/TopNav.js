import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setDarkTheme } from '../../../actions/settingsActions';

class BrowserNav extends Component {
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

  getProfilePhoto = () => {};

  render() {
    const { firstName, lastName } = this.props.profile;

    const { darkTheme } = this.props.settings;

    const { photoURL, isEmpty, isLoaded } = this.props.auth;

    const isAuthenticated = !isEmpty && isLoaded;

    const badges = {
      messages: '1',
      notifications: ''
    };

    let navdrop = {};

    if (photoURL) {
      navdrop = {
        background: {
          backgroundImage: `url(${photoURL})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '38px'
        },
        content: ''
      };
    } else {
      navdrop = {
        background: { backgroundColor: '#ae64db' },
        content: this.getInitials(firstName, lastName)
      };
    }

    return (
      <nav className="full navbar navbar-expand navbar-dark">
        <Link to="/" className="navbar-brand">
          ClientPanel
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav right-bar ml-auto d-flex justify-content-around">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-envelope" />
                  <span className="badge badge-notify">{badges.messages}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-bell" />
                  <span className="badge badge-notify">
                    {badges.notifications}
                  </span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="dropdown-toggle btn shadow text-light account-btn"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={navdrop.background}
                >
                  {navdrop.content}
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow">
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
        </div>
      </nav>
    );
  }
}

BrowserNav.propTypes = {
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
)(BrowserNav);
