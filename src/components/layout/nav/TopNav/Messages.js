import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class Messages extends Component {
  state = {
    badges: {
      messages: '0'
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
        to="/messages"
        className="nav-link"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Messages"
      >
        <i className="fas fa-envelope">
          <span
            className={`badge badge-notify ${this.showBadge(badges.messages)}`}
          >
            {badges.messages}
          </span>
        </i>
      </Link>
    );
  }
}

export default Messages;
