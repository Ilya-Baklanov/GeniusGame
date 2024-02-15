import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { usePlatform } from '@vkontakte/vkui';
import style from './MainLayout.module.css';

const MainLayout = ({ children, backgroundColor = 'primary' }) => {
  const platform = usePlatform();

  return (
    <div className={cn(style['layout-wrapper'])}>
      <div className={cn(style.layout, style[platform], style[backgroundColor])}>
        <div className={cn(style.layout_frame)}>
          {children}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.oneOf(['primary', 'secondary']),
};

export default MainLayout;
