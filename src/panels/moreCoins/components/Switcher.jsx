import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Text } from '@vkontakte/vkui';

import './Switcher.css';

const Switcher = ({ onToggle }) => (
  <label htmlFor="push-switcher" className="push-switcher">
    <input id="push-switcher" onChange={onToggle} type="checkbox" />
    <div className="push-slider" />
  </label>
);

Switcher.propTypes = {
  onToggle: PropTypes.func,
};

export default Switcher;
