import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Text,
} from '@vkontakte/vkui';

import style from './Card.module.css';
import { MoreCoins } from '../../../assets/image';

const Card = ({
  onClick, goTo, text, additionalCoins, isComplete,
}) => (
  <div
    onClick={isComplete ? null : onClick}
    data-to={goTo}
    className={cn(style['more-coins-card'], { [style.complete]: isComplete })}
  >
    <div className={cn(style['more-coins-card-content-container'])}>
      <Text className={cn(style['more-coins-card-text'], { [style.complete]: isComplete })}>
        {text}
      </Text>
      {additionalCoins && (
      <div className={cn(style['more-coins-card-additional-coins-wrapper'], { [style.complete]: isComplete })}>
        <Text className={cn(style['more-coins-card-additional-coins-text'], { [style.complete]: isComplete })}>
          {`+${additionalCoins}`}
        </Text>
        <MoreCoins />
      </div>
      )}
    </div>
  </div>
);

Card.propTypes = {
  onClick: PropTypes.func,
  goTo: PropTypes.string,
  text: PropTypes.string,
  additionalCoins: PropTypes.number,
  isComplete: PropTypes.bool,
};

export default Card;
