import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, Text } from '@vkontakte/vkui';

import './PromoCodeCards.css';
import { PROMOCODES } from '../../../assets/constants/constants';

const PromoCodeCards = ({ amountCoins, onActivateModal }) => {
  const getActivePromoCodeClassName = useCallback((denomination) => (Math.floor(amountCoins / 100) === denomination / 100 ? 'active' : ''), [amountCoins]);
  const promocodeCardsClickHandler = useCallback((denomination, promoCodeDescription) => {
    onActivateModal(denomination, promoCodeDescription);
  }, []);

  return (
    <div className="promocode-cards-wrapper">
      <div className="promocode-cards-container">
        {PROMOCODES.map(({ denomination, description }, index) => (
          <div key={index} onClick={() => promocodeCardsClickHandler(denomination, description)} className={`promocode-card ${getActivePromoCodeClassName(denomination)}`}>
            <Text className={`promocode-card-denomination ${getActivePromoCodeClassName(denomination)}`}>
              {`${denomination}₽`}
            </Text>
            <Text className={`promocode-card-description ${getActivePromoCodeClassName(denomination)}`}>
              {description}
            </Text>
          </div>
        ))}
      </div>
      <div className="promocode-rules">
        <Link className="promocode-rules-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила акции</Link>
        <Link className="promocode-rules-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила игры</Link>
      </div>
    </div>
  );
};

PromoCodeCards.propTypes = {
  amountCoins: PropTypes.number,
  onActivateModal: PropTypes.func,
};

export default PromoCodeCards;
