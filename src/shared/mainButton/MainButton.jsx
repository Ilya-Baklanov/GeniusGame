import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './MainButton.module.css';

const MainButton = ({
  text, onClick, disabled, isFullWidth, theme = 'primary',
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(style['main-button'], { [style.disabled]: disabled, [style.full_width]: isFullWidth }, style[theme])}
    disabled={disabled}
  >
    <Text className={cn(style['main-button-text'], style[theme])}>
      {text}
    </Text>
  </button>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  theme: PropTypes.string,
};

export default MainButton;
