import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export class Account extends Component {
  updateUserAccount = () => {
    const { firebase } = this.props;

    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: 'Jane Q. User',
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

    const profilePhoto = firebase.auth.photoURL;

    return (
      <div>
        <button onClick={this.updateUserAccount}>click me</button>
        <div className="card">
          <div className="card-body">
            <img src={profilePhoto} width="200" alt="" />
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
