import React from 'react';
import PropTypes from 'prop-types';

import './MoreCoinsCards.css';
import { MORE_COINS_CARDS } from '../../../assets/constants/constants';
import Card from './Card';

const MoreCoinsCards = ({ go }) => (
  <div className="more-coins-cards-wrapper">
    {MORE_COINS_CARDS.map(({ text, additionalCoins }, index) => (
      <Card
        key={index}
        text={text}
        additionalCoins={additionalCoins}
      />
    ))}
  </div>
);

MoreCoinsCards.propTypes = {
  go: PropTypes.func.isRequired,
};

export default MoreCoinsCards;
