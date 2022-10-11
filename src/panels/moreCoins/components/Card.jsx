import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@vkontakte/vkui';

import './Card.css';
import { MoreCoins } from '../../../assets/image';

const Card = ({
  onClick, goTo, text, additionalCoins,
}) => (
  <div
    onClick={onClick}
    data-to={goTo}
    className="more-coins-card"
  >
    <div className="more-coins-card-content-container">
      <Text className="more-coins-card-text">
        {text}
      </Text>
      <div className="more-coins-card-additional-coins-wrapper">
        <Text className="more-coins-card-additional-coins-text">
          {`+${additionalCoins}`}
        </Text>
        <MoreCoins />
      </div>
    </div>
  </div>
);

Card.propTypes = {
  onClick: PropTypes.func,
  goTo: PropTypes.string,
  text: PropTypes.string,
  additionalCoins: PropTypes.string,
};

export default Card;
