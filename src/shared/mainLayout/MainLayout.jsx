import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './MainLayout.module.css';

const MainLayout = ({ children }) => (
  <div className={cn(style['layout-wrapper'])}>
    <div className={cn(style.layout)}>
      {children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
