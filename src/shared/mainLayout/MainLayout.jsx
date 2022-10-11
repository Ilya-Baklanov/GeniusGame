import React from 'react';
import PropTypes from 'prop-types';

import './MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="layout-wrapper">
    <div className="layout">
      {children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
