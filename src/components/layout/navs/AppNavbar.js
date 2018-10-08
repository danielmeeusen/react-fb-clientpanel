import React, { Component } from 'react';
import windowSize from 'react-window-size';

import MobileTopNavDrop from './MobileTopNavDrop';
import TopNavDrop from './TopNavDrop';

class AppNavbar extends Component {
  render() {
    if (this.props.windowWidth > 768) {
      return <TopNavDrop />;
    } else {
      return <MobileTopNavDrop />;
    }
  }
}

export default windowSize(AppNavbar);
