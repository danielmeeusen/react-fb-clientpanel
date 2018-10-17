import React, { Component, history } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import ensureArray from 'ensure-array';

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class SideBar extends Component {
  state = {
    selected: 'home',
    expanded: false
  };

  onSelect = selected => {
    this.setState({ selected: selected });
  };
  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };

  pageTitle = {
    home: 'Home',
    devices: ['Devices'],
    reports: ['Reports'],
    'settings/policies': ['Settings', 'Policies'],
    'settings/network': ['Settings', 'Network']
  };

  renderBreadcrumbs() {
    const { selected } = this.state;
    const list = ensureArray(this.pageTitle[selected]);

    return (
      <Breadcrumbs>
        {list.map((item, index) => (
          <Breadcrumbs.Item
            active={index === list.length - 1}
            key={`${selected}_${index}`}
          >
            {item}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    );
  }

  navigate = pathname => () => {
    this.setState({ selected: pathname });
  };

  render() {
    const { expanded, selected } = this.state;

    return (
      <Route
        render={({ location, history }) => (
          <React.Fragment>
            <SideNav
              onSelect={selected => {
                const to = selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="/">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{ fontSize: '1.75em' }}
                    />
                  </NavIcon>
                  <NavText>Dashboard</NavText>
                </NavItem>
                <NavItem eventKey="/account">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-device"
                      style={{ fontSize: '1.75em' }}
                    />
                  </NavIcon>
                  <NavText>Account</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </React.Fragment>
        )}
      />
    );
  }
}

export default SideBar;
