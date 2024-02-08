import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Text,
} from '@vkontakte/vkui';

import style from './Card.module.css';
import { MoreCoins } from '../../../assets/image';

const Card = ({
  onClick, goTo, title, description, textOnSuccess, additionalCoins, isComplete,
}) => (
  <div
    onClick={isComplete ? null : onClick}
    data-to={goTo}
    className={cn(style.card_wrapper, { [style.complete]: isComplete })}
  >
    <div className={cn(style.text_content)}>
      <Text className={cn(style.title)}>
        {title}
      </Text>
      <Text className={cn(style.description)}>
        {description}
      </Text>
    </div>
    {additionalCoins && (
      <div className={cn(style.additional_coins_wrapper)}>
        {isComplete && (
          <Text className={cn(style.text_on_success)}>
            {textOnSuccess}
          </Text>
        )}
        <div className={cn(style.additional_coins, { [style.complete]: isComplete })}>
          <MoreCoins />
          <Text className={cn(style.additional_coins_numbers, { [style.complete]: isComplete })}>
            {`+${additionalCoins}`}
          </Text>
        </div>
      </div>
    )}
  </div>
);

Card.propTypes = {
  onClick: PropTypes.func,
  goTo: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  textOnSuccess: PropTypes.string,
  additionalCoins: PropTypes.number,
  isComplete: PropTypes.bool,
};

export default Card;
