import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Link to="/client/add" className="btn btn-success btn-block">
      New Client <i className="fas fa-plus" style={{ fontSize: '14px' }} />
    </Link>
  );
};
