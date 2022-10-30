import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './Switcher.module.css';

const Switcher = ({ onToggle }) => (
  <label htmlFor="switcher" className={cn(style.switcher)}>
    <input id="switcher" onChange={onToggle} type="checkbox" />
    <div className={cn(style.slider)} />
    <div className={cn(style['content-wrapper'])}>
      <div className={cn(style['switcher-label-text-wrapper'])}>
        <Text className={cn(style['switcher-label-left-text'])}>
          Друзья
        </Text>
      </div>
      <div className={cn(style['switcher-label-text-wrapper'])}>
        <Text className={cn(style['switcher-label-right-text'])}>
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
