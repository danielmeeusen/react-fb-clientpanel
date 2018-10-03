import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import Body from './components/layout/Body';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Body />
      </Provider>
    );
  }
}

export default App;
