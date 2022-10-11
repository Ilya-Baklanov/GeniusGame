import React from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  Text,
} from '@vkontakte/vkui';

import {
  UserMain, PromoCode, Rating, MoreCoins,
} from '../../assets/image';

import './Navbar.css';

const Navbar = ({ id, go }) => (
  <div className="navbar">
    <IconButton
      className={`navbar-button ${id === 'home' ? 'active' : ''}`}
      onClick={go}
      data-to="home"
    >
      <UserMain />
      <Text className={`navbar-button_text ${id === 'home' ? 'active' : ''}`}>
        Главная
      </Text>
    </IconButton>
    <IconButton
      className={`navbar-button ${id === 'promoCode' ? 'active' : ''}`}
      onClick={go}
      data-to="promoCode"
    >
      <PromoCode />
      <Text className={`navbar-button_text ${id === 'promoCode' ? 'active' : ''}`}>
        Промокоды
      </Text>
    </IconButton>
    <IconButton
      className={`navbar-button ${id === 'rating' ? 'active' : ''}`}
      onClick={go}
      data-to="rating"
    >
      <Rating />
      <Text className={`navbar-button_text ${id === 'rating' ? 'active' : ''}`}>
        Рейтинг
      </Text>
    </IconButton>
    <IconButton
      className={`navbar-button ${id === 'moreCoins' ? 'active' : ''}`}
      onClick={go}
      data-to="moreCoins"
    >
      <MoreCoins />
      <Text className={`navbar-button_text ${id === 'moreCoins' ? 'active' : ''}`}>
        Ещё монеты
      </Text>
    </IconButton>
  </div>
);

Navbar.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Navbar;
