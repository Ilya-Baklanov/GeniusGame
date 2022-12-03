/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ScreenSpinner, Text } from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import style from './MyPromoCode.module.css';
import MainButton from '../../shared/mainButton/MainButton';

const MyPromoCode = ({
  id, go, amountCoins, isLoading, isMobile, fetchedUser, getUserPromoCodes,
}) => {
  const [promocodesList, setPromocodesList] = useState();
  const [isCopied, setIsCopied] = useState([]);

  useEffect(() => {
    if (fetchedUser) {
      getUserPromoCodes(fetchedUser)
        .then((response) => {
          setPromocodesList(response.promoList);
        });
    }
  }, [fetchedUser]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Мои промокоды"
      isLoading={isLoading}
      isMobile={isMobile}
      activeTab="promoCode"
    >
      {promocodesList
        ? (
          <div className={style.wrapper}>
            {promocodesList.length > 0 ? promocodesList.map(({ promo, price }, index) => (
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
                    {isCopied.includes(promo) ? 'Промокод скопирован.' : `Промокод на ${price}₽`}
                  </Text>
                </div>
              </CopyToClipboard>
            ))
              : (
                <div className={style['no-promocode']}>
                  <Text className={style['no-promocode-text']}>
                    Пока что у тебя нет промокодов. Играй чаще, обменивай баллы на промокоды,
                    и тогда они обязательно здесь появятся.
                  </Text>
                  <div className={style['no-promocode-button-wrapper']}>
                    <MainButton
                      text="На главную"
                      onClick={go}
                      goTo="home"
                    />
                  </div>
                </div>
              )}
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
  fetchedUser: PropTypes.any,
  getUserPromoCodes: PropTypes.func,
};

export default MyPromoCode;
