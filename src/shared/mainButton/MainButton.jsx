import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Text,
} from '@vkontakte/vkui';

import './MainButton.css';

const MainButton = ({
  text, onClick, goTo, disabled,
}) => (
  <Button
    stretched
    size="l"
    mode="secondary"
    onClick={onClick}
    data-to={goTo}
    className={`main-button ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
  >
    <Text className={`main-button-text ${disabled ? 'disabled' : ''}`}>
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
