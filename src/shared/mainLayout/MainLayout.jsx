import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { usePlatform } from '@vkontakte/vkui';
import style from './MainLayout.module.css';

const MainLayout = ({ children, backgroundColor = 'primary', classNames }) => {
  const platform = usePlatform();

  return (
    <div className={cn(style['layout-wrapper'], {
      [classNames?.wrapper]: classNames?.wrapper,
    })}
    >
      <div className={cn(style.layout, style[platform], style[backgroundColor], {
        [classNames?.layout]: classNames?.layout,
      })}
      >
        <div className={cn(style.layout_frame, {
          [classNames?.frame]: classNames?.frame,
        })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.oneOf(['primary', 'secondary']),
  classNames: PropTypes.shape({
    wrapper: PropTypes.string,
    layout: PropTypes.string,
    frame: PropTypes.string,
  }),
};

export default MainLayout;
