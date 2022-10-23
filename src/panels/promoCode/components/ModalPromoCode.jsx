import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, Link, ModalPage, ModalPageHeader, PanelHeaderClose, Text, useAdaptivity,
} from '@vkontakte/vkui';

import './ModalPromoCode.css';
import MainButton from '../../../shared/mainButton/MainButton';

const ModalPromoCode = ({
  id,
  onClose,
  content,
  amountCoins,
}) => {
  const { viewWidth } = useAdaptivity();

  const availablePromoCode = useMemo(
    () => Math.floor(amountCoins / 100) === content.denomination / 100,
    [amountCoins, content],
  );
  const description = useMemo(() => {
    if (!amountCoins || !content) {
      return '';
    }
    switch (true) {
      case availablePromoCode:
        return 'Ты можешь забрать этот промокод или продолжить играть, чтобы заработать монеты на промокод ещё большего номинала.';
      case Math.floor(amountCoins / 100) > content.denomination / 100:
        return 'У тебя есть возможность получить промокод с большим номиналом! Ты можешь забрать его или продолжить играть, чтобы заработать монеты на промокод ещё большего номинала.';
      case Math.floor(amountCoins / 100) < content.denomination / 100:
        return 'Пока у тебя недостаточно монет, чтобы получить этот промокод. Продолжай играть, чтобы заработать монеты на промокод!';
      default:
        return '';
    }
  }, [amountCoins, content]);

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        size="s"
        header={(
          <ModalPageHeader
            after={
              <PanelHeaderClose onClick={onClose} />
              }
          />
      )}
      >
        <div className="promocode-modal-wrapper">
          <div className="promocode-modal-promocode-card">
            <Text className="promocode-modal-promocode-card-text">
              {`Промокод на ${content.denomination}₽`}
            </Text>
            <Text className="promocode-modal-promocode-card-description">
              {content.promoCodeDescription}
            </Text>
          </div>
          <div className="promocode-modal-description-wrapper">
            <Text className="promocode-modal-description-text">
              {description}
            </Text>
          </div>
          <div className="promocode-modal-rules">
            <Link className="promocode-modal-rules-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила игры</Link>
          </div>
          <div className="promocode-modal-button-wrapper">
            <MainButton
              text="Получить"
              disabled={!availablePromoCode}
              onClick={() => console.log('HOBBA')}
            />
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

ModalPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
  amountCoins: PropTypes.string,
};

export default ModalPromoCode;
