import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './MainButton.module.css';

const MainButton = ({
  text, onClick, disabled, isAnimated,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(style['main-button'], { [style.disabled]: disabled }, { [style.animated]: isAnimated })}
    disabled={disabled}
  >
    <Text className={cn(style['main-button-text'], { [style.disabled]: disabled })}>
      {text}
    </Text>
  </button>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isAnimated: PropTypes.bool,
};

export default MainButton;
