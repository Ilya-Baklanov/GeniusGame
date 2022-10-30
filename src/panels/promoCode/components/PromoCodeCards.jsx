import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, Text } from '@vkontakte/vkui';
import cn from 'classnames';

import style from './PromoCodeCards.module.css';
import { PROMOCODES } from '../../../assets/constants/constants';

const PromoCodeCards = ({ amountCoins, onActivateModal }) => {
  const isActivePromoCode = useCallback(
    (denomination) => Math.floor(amountCoins / 100) === denomination / 100,
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
        <Link className={cn(style['promocode-rules-link'])} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила акции</Link>
        <Link className={cn(style['promocode-rules-link'])} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила игры</Link>
      </div>
    </div>
  );
};

PromoCodeCards.propTypes = {
  amountCoins: PropTypes.string.isRequired,
  onActivateModal: PropTypes.func,
};

export default PromoCodeCards;
