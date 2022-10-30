import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  AppearanceProvider,
  Link,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Text,
  useAdaptivity,
  IconButton,
} from '@vkontakte/vkui';

import style from './ModalPromoCode.module.css';
import MainButton from '../../../shared/mainButton/MainButton';
import { CloseGray } from '../../../assets/image';

const ModalPromoCode = ({
  id,
  onClose,
  content,
  amountCoins,
  promoCode,
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
            right={(
              <IconButton onClick={onClose}>
                <CloseGray />
              </IconButton>
            )}
          />
      )}
      >
        <div className={cn(style['promocode-modal-wrapper'])}>
          <div className={cn(style['promocode-modal-promocode-card'])}>
            <Text className={cn(style['promocode-modal-promocode-card-text'])}>
              {`Промокод на ${content.denomination}₽`}
            </Text>
            <Text className={cn(style['promocode-modal-promocode-card-description'])}>
              {content.promoCodeDescription}
            </Text>
          </div>
          <div className={cn(style['promocode-modal-description-wrapper'])}>
            <Text className={cn(style['promocode-modal-description-text'])}>
              {description}
            </Text>
          </div>
          <div className={cn(style['promocode-modal-rules'])}>
            <Link className={cn(style['promocode-modal-rules-link'])} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила игры</Link>
          </div>
          <div className={cn(style['promocode-modal-button-wrapper'])}>
            <MainButton
              text="Получить"
              disabled={!availablePromoCode}

              // onClick={promoCode} // наверно это не так должно быть)
            />
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

export const getPromoCode = async function fetchPromoCode(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'localhost:8080',
    },
    dataType: 'json',
    body: JSON.stringify({
      userId: 105560317, // тут юзер должен приходить
      coins: '200', // тут должна быть цена купона, а не колво очков юзера
      // значения брал для теста
    }),
  };
  const response = await fetch('http://localhost:8080/v1/api/getPromo/', requestOptions);
  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.log('error');
  }
  return response.json().promo;
};

ModalPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
  amountCoins: PropTypes.string,
  promoCode: PropTypes.string,
};

export default ModalPromoCode;
