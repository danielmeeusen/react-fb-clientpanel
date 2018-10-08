import React from 'react';
import RollingLight from './rollingLight.gif';
import RollingDark from './rollingDark.gif';

export default () => {
  const strSettings = localStorage.getItem('settings');
  const settings = JSON.parse(strSettings);
  if (settings.darkTheme) {
    return (
      <div>
        <img className="rollingDark" src={RollingDark} alt="Loading..." />
        <div className="text-center rolling-text-light pt-4"> Loading...</div>
      </div>
    );
  } else {
    return (
      <div>
        <img className="rollingLight" src={RollingLight} alt="Loading..." />
        <div className="text-center rolling-text-dark pt-4"> Loading...</div>
      </div>
    );
  }
};
