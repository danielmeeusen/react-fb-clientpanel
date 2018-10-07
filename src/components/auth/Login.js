import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err =>
        notifyUser(
          'Username or Password was not correct.  Please try again.',
          'error'
        )
      );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row mt">
        <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto">
          <div className="card shadow">
            <h1 className="text-center card-header">
              <i className="fas fa-lock" /> Login
            </h1>
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-login btn-primary btn-block"
                />
              </form>

              <div className="text-center mt-4">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
