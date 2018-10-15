import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setDarkTheme,
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';

class Settings extends Component {
  darkThemeChange = () => {
    const { setDarkTheme } = this.props;
    setDarkTheme();
  };

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      darkTheme,
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div className="col-xl-8 col-md-10 col-sm-12 mt mx-auto">
        <div className="card shadow">
          <h5 className="card-header">Edit Settings</h5>
          <div className="card-body">
            <div className="settings">
              <form>
                <div className="slide-label d-flex justify-content-between border-bottom">
                  Dark Theme
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="darkTheme"
                      checked={!!darkTheme}
                      onChange={this.darkThemeChange}
                    />
                    <div className="slider round" />
                  </label>
                </div>

                <div className="slide-label d-flex justify-content-between border-bottom">
                  Allow Registration
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="allowRegistration"
                      checked={!!allowRegistration}
                      onChange={this.allowRegistrationChange}
                    />
                    <div className="slider round" />
                  </label>
                </div>

                <div className="slide-label d-flex justify-content-between border-bottom">
                  Disable Balance on Add
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="disableBalanceOnAdd"
                      checked={!!disableBalanceOnAdd}
                      onChange={this.disableBalanceOnAddChange}
                    />
                    <div className="slider round" />
                  </label>
                </div>

                <div className="slide-label d-flex justify-content-between border-bottom">
                  Disable Balance on Edit
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="disableBalanceOnEdit"
                      checked={!!disableBalanceOnEdit}
                      onChange={this.disableBalanceOnEditChange}
                    />
                    <div className="slider round" />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDarkTheme: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    setDarkTheme,
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
  }
)(Settings);
