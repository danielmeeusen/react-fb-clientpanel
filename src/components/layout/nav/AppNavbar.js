import React, { Component } from 'react';
import windowSize from 'react-window-size';

import MobileNav from './MobileNav';
import BrowserNav from './BrowserNav';

class AppNavbar extends Component {
  render() {
    if (this.props.windowWidth > 768) {
      return <BrowserNav />;
    } else {
      return <MobileNav />;
    }
  }
}

export default windowSize(AppNavbar);
