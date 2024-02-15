import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  IconButton,
  Text,
} from '@vkontakte/vkui';

import {
  UserMain, PromoCode, Rating, MoreCoinsTab,
} from '../../assets/image';

import style from './Navbar.module.css';

const Navbar = ({ id, go }) => (
  <div className={cn(style.navbar)}>
    <IconButton
      aria-label="Вкладка 'Главная'"
      hasActive={false}
      hasHover={false}
      hoverMode=""
      focusVisibleMode=""
      className={cn(style['navbar-button'], {
        [style.active]: id === 'home',
        [style.disabled]: !go,
      })}
      onClick={go}
      data-to="home"
    >
      <UserMain />
      <Text className={cn(style['navbar-button_text'], {
        [style.active]: id === 'home',
        [style.disabled]: !go,
      })}
      >
        Главная
      </Text>
    </IconButton>
    <IconButton
      aria-label="Вкладка 'Промокоды'"
      hasActive={false}
      hasHover={false}
      hoverMode=""
      focusVisibleMode=""
      className={cn(style['navbar-button'], {
        [style.active]: id === 'promoCode',
        [style.disabled]: !go,
      })}
      onClick={go}
      data-to="promoCode"
    >
      <PromoCode />
      <Text className={cn(style['navbar-button_text'], {
        [style.active]: id === 'promoCode',
        [style.disabled]: !go,
      })}
      >
        Промокоды
      </Text>
    </IconButton>
    <IconButton
      aria-label="Вкладка 'Рейтинг'"
      hasActive={false}
      hasHover={false}
      hoverMode=""
      focusVisibleMode=""
      className={cn(style['navbar-button'], {
        [style.active]: id === 'rating',
        [style.disabled]: !go,
      })}
      onClick={go}
      data-to="rating"
    >
      <Rating />
      <Text className={cn(style['navbar-button_text'], {
        [style.active]: id === 'rating',
        [style.disabled]: !go,
      })}
      >
        Рейтинг
      </Text>
    </IconButton>
    <IconButton
      aria-label="Вкладка 'Ещё монеты'"
      hasActive={false}
      hasHover={false}
      hoverMode=""
      focusVisibleMode=""
      className={cn(style['navbar-button'], {
        [style.active]: id === 'moreCoins',
        [style.disabled]: !go,
      })}
      onClick={go}
      data-to="moreCoins"
    >
      <MoreCoinsTab />
      <Text className={cn(style['navbar-button_text'], {
        [style.active]: id === 'moreCoins',
        [style.disabled]: !go,
      })}
      >
        Ещё монеты
      </Text>
    </IconButton>
  </div>
);

Navbar.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func,
};

export default Navbar;
