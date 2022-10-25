import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@vkontakte/vkui';

import './Card.css';
import { MoreCoins } from '../../../assets/image';

const Card = ({
  onClick, goTo, text, additionalCoins, isComplete,
}) => {
  const completedConditionClassName = useMemo(() => (isComplete ? 'complete' : ''), [isComplete]);

  return (
    <div
      onClick={onClick}
      data-to={goTo}
      className={`more-coins-card ${completedConditionClassName}`}
    >
      <div className="more-coins-card-content-container">
        <Text className={`more-coins-card-text ${completedConditionClassName}`}>
          {text}
        </Text>
        <div className={`more-coins-card-additional-coins-wrapper ${completedConditionClassName}`}>
          <Text className={`more-coins-card-additional-coins-text ${completedConditionClassName}`}>
            {`+${additionalCoins}`}
          </Text>
          <MoreCoins />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  onClick: PropTypes.func,
  goTo: PropTypes.string,
  text: PropTypes.string,
  additionalCoins: PropTypes.string,
  isComplete: PropTypes.bool,
};

export default Card;
