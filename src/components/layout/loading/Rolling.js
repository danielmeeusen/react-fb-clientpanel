import React from 'react';
import RollingLight from './rollingLight.gif';
import RollingDark from './rollingDark.gif';

export default () => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  if (settings.darkTheme) {
    return (
      <div>
        <img className="rollingDark" src={RollingDark} alt="Loading..." />
        <div className="text-center rolling-text-dark"> Loading...</div>
      </div>
    );
  } else {
    return (
      <div>
        <img className="rollingLight" src={RollingLight} alt="Loading..." />
        <div className="text-center rolling-text-light"> Loading...</div>
      </div>
    );
  }
};
