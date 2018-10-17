import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class Messages extends Component {
  state = {
    badges: {
      notifications: '0'
    }
  };

  showBadge = str => {
    if (str === '0') {
      return 'd-none';
    }
  };

  render() {
    const { badges } = this.state;

    return (
      <Link
        to="/"
        className="nav-link"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Notifications"
      >
        <i className="fas fa-bell">
          <span
            className={`badge badge-notify ${this.showBadge(
              badges.notifications
            )}`}
          >
            {badges.notifications}
          </span>
        </i>
      </Link>
    );
  }
}

export default Messages;
