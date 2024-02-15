/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ScreenSpinner, Text } from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import style from './MyPromoCode.module.css';
import MainButton from '../../shared/mainButton/MainButton';

const MyPromoCode = ({
  id, go, amountCoins, isLoading, isMobile, promocodesList,
}) => {
  // TODO поставить null как дефолтное значение
  const [isCopied, setIsCopied] = useState();

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Мои промокоды"
      description={'Обменивай монеты на промокоды\nи совершай покупки на Мегамаркете!'}
      isLoading={isLoading}
      isMobile={isMobile}
      activeTab="promoCode"
      button={(
        <button
          type="button"
          className={style.button}
          onClick={() => go(null, 'promoCode')}
        >
          <Text className={style['button-text']}>
            Все промокоды
          </Text>
        </button>
      )}
    >
      {promocodesList
        ? (
          <div className={style.wrapper}>
            {promocodesList.map(({ promo, price }, index) => (
              <CopyToClipboard
                key={index}
                onCopy={() => setIsCopied(promo)}
                text={promo}
              >
                <div className={style['promocode-wrapper']}>
                  <Text className={style['promocode-name']}>
                    {promo}
                  </Text>
                  <Text className={style['promocode-price']}>
                    {isCopied === promo ? 'Промокод скопирован.' : `Промокод на ${price}₽`}
                  </Text>
                </div>
              </CopyToClipboard>
            ))}
          </div>
        )
        : (<ScreenSpinner size="large" />)}
    </CommonPanel>
  );
};

MyPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  promocodesList: PropTypes.array,
};

export default MyPromoCode;
