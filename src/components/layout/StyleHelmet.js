import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class StyleHelmet extends Component {
  render() {
    const { darkTheme } = this.props.settings;
    const background = darkTheme ? '#151520' : '#e1e1eb';
    const text = darkTheme ? 'white' : 'black';

    return (
      <Helmet>
        <style>{`body {
               background-color: ${background};
               color: ${text};
          }`}</style>
      </Helmet>
    );
  }
}

StyleHelmet.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(StyleHelmet);
