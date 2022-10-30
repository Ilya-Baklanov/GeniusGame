import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './Switcher.module.css';

const Switcher = ({ onToggle, state }) => (
  <label htmlFor="push-switcher" className={cn(style['push-switcher'])}>
    <input id="push-switcher" onChange={onToggle} type="checkbox" checked={state} />
    <div className={cn(style['push-slider'])} />
  </label>
);

Switcher.propTypes = {
  onToggle: PropTypes.func,
  state: PropTypes.number,
};

export default Switcher;
