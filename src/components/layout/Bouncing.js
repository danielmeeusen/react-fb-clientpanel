import React from 'react';
import Bouncing from './bouncing.gif';

export default () => {
  return (
    <div>
      <img
        src={Bouncing}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
