import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Text } from '@vkontakte/vkui';

import './Switcher.css';

const Switcher = ({ onToggle }) => (
  <label htmlFor="switcher" className="switcher">
    <input id="switcher" type="checkbox" />
    <div className="slider" />
    <div className="content-wrapper">
      <div className="switcher-label-text-wrapper">
        <Text className="switcher-label-left-text">
          Друзья
        </Text>
      </div>
      <div className="switcher-label-text-wrapper">
        <Text className="switcher-label-right-text">
          Все игроки
        </Text>
      </div>
    </div>
  </label>
);

Switcher.propTypes = {
  onToggle: PropTypes.func,
};

export default Switcher;
