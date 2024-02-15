import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './Switcher.module.css';

const Switcher = ({ onToggle, checked }) => (
  <label htmlFor="switcher" className={cn(style.switcher)}>
    <input id="switcher" onChange={onToggle} checked={checked} type="checkbox" />
    <div className={cn(style.slider)} />
    <div className={cn(style['content-wrapper'])}>
      <div className={cn(style['switcher-label-left-text-wrapper'])}>
        <Text className={cn(style['switcher-label-left-text'])}>
          Все игроки
        </Text>
      </div>
      <div className={cn(style['switcher-label-right-text-wrapper'])}>
        <Text className={cn(style['switcher-label-right-text'])}>
          Друзья
        </Text>
      </div>
    </div>
  </label>
);

Switcher.propTypes = {
  onToggle: PropTypes.func,
  checked: PropTypes.bool,
};

export default Switcher;
