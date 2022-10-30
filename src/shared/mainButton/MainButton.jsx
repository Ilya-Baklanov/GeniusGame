import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Button,
  Text,
} from '@vkontakte/vkui';

import style from './MainButton.module.css';

const MainButton = ({
  text, onClick, goTo, disabled,
}) => (
  <Button
    stretched
    size="l"
    mode="secondary"
    onClick={onClick}
    data-to={goTo}
    className={cn(style['main-button'], { [style.disabled]: disabled })}
    disabled={disabled}
  >
    <Text className={cn(style['main-button-text'], { [style.disabled]: disabled })}>
      {text}
    </Text>
  </Button>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  goTo: PropTypes.string,
  disabled: PropTypes.bool,
};

export default MainButton;
