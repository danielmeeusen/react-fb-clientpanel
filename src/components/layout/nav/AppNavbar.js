import React, { Component } from 'react';
import windowSize from 'react-window-size';

import MobileNav from './MobileNav';
import TopNav from './TopNav/TopNav';
import SideBar from './SideBar';

class AppNavbar extends Component {
  render() {
    if (this.props.windowWidth > 768) {
      return <TopNav />;
    } else {
      return <MobileNav />;
    }
  }
}

export default windowSize(AppNavbar);
