import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Text,
} from '@vkontakte/vkui';

import './MainButton.css';

const MainButton = ({ text, onClick, goTo }) => (
  <Button
    stretched
    size="l"
    mode="secondary"
    onClick={onClick}
    data-to={goTo}
    className="main-button"
  >
    <Text className="main-button-text">
      {text}
    </Text>
  </Button>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  goTo: PropTypes.string,
};

export default MainButton;
