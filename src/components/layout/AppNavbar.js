import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
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

  render() {
    const { firstName, lastName } = this.props.profile;

    const { isAuthenticated } = this.state;

    return (
      <nav className="navbar navbar-expand navbar-dark">
        <Link to="/" className="navbar-brand pl-2">
          ClientPanel
        </Link>

        <div className="collapse navbar-collapse pl-4">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav ml-auto pr-2">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle btn btn-floating text-light account-btn"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.getInitials(firstName, lastName)}
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow">
                  <a href="#!" className="dropdown-item">
                    Account
                  </a>
                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>
                  <a
                    href="#!"
                    className="dropdown-item"
                    onClick={this.onLogoutClick}
                  >
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

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
    profile: state.firebase.profile
  }))
)(AppNavbar);
