import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export class Account extends Component {
  state = {
    editAccount: false
  };

  updateUserAccount = () => {
    const { firebase } = this.props;

    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/react-client-panel-49a4a.appspot.com/o/IMG_4193.JPG?alt=media&token=3dee0707-3ecc-48ff-9e3e-aa16e0a17959'
      })
      .then(function() {
        console.log('Make notification');
      })
      .catch(function(error) {
        console.log('make notification!');
      });
  };

  render() {
    const firebase = this.props;

    const {
      photoURL,
      displayName,
      email,
      emailVerified,
      phoneNumber
    } = this.props.auth;

    const { firstName, lastName } = this.props.profile;

    return (
      <div className="card shadow">
        <h4 className="card-header">Account Settings</h4>
        <div className="card-body">
          <div className="col-6 mx-auto">
            <div
              className="account-img mx-auto"
              style={{ backgroundImage: `url(${photoURL})` }}
            />
            <div className="account-details">
              <h1>
                {firstName} {lastName}
              </h1>
              <p>
                Email: <b>{email}</b>
              </p>
              <p>
                Display Name: <b>{displayName}</b>
              </p>
              <p>
                Position: <b>Owner</b>
              </p>
              <p>
                email: <b>{displayName}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
    profile: state.firebase.profile
  }))
)(Account);
