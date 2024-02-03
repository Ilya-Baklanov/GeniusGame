import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { usePlatform } from '@vkontakte/vkui';
import style from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  const platform = usePlatform();

  return (
    <div className={cn(style['layout-wrapper'])}>
      <div className={cn(style.layout, style[platform])}>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
