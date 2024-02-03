/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, Text } from '@vkontakte/vkui';
import cn from 'classnames';

import style from './PromoCodeCards.module.css';
import { GAME_RULES, PROMOCODES, PROMOTION_RULES } from '../../../assets/constants/constants';

const PromoCodeCards = ({ amountCoins, onActivateModal }) => {
  const isActivePromoCode = useCallback(
    (denomination) => (+amountCoins >= 1100
      ? ((Math.floor(+amountCoins / 100) > denomination / 100)
        && ((denomination / 100) === 10))
      : Math.floor(+amountCoins / 100) === denomination / 100),
    [amountCoins],
  );
  const promocodeCardsClickHandler = useCallback((denomination, promoCodeDescription) => {
    onActivateModal(denomination, promoCodeDescription);
  }, []);

  return (
    <div className={cn(style['promocode-cards-wrapper'])}>
      <div className={cn(style['promocode-cards-container'])}>
        {PROMOCODES.map(({ denomination, description }, index) => (
          <div key={index} onClick={() => promocodeCardsClickHandler(denomination, description)} className={cn(style['promocode-card'], { [style.active]: isActivePromoCode(denomination) })}>
            <Text className={cn(style['promocode-card-denomination'], { [style.active]: isActivePromoCode(denomination) })}>
              {`${denomination}₽`}
            </Text>
            <Text className={cn(style['promocode-card-description'], { [style.active]: isActivePromoCode(denomination) })}>
              {description}
            </Text>
          </div>
        ))}
      </div>
      <div className={cn(style['promocode-rules'])}>
        <Link
          className={cn(style['promocode-rules-link'])}
          target="_blank"
          href={PROMOTION_RULES.href}
        >
          {PROMOTION_RULES.title}
        </Link>
        <Link
          className={cn(style['promocode-rules-link'])}
          target="_blank"
          href={GAME_RULES.href}
        >
          {GAME_RULES.title}
        </Link>
      </div>
    </div>
  );
};

PromoCodeCards.propTypes = {
  amountCoins: PropTypes.string.isRequired,
  onActivateModal: PropTypes.func,
};

export default PromoCodeCards;
