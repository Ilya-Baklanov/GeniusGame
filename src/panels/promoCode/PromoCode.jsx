import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import PromoCodeCards from './components/PromoCodeCards';
import style from './PromoCode.module.css';

const PromoCode = ({
  id, go, amountCoins, onActivateModal, isLoading, isMobile,
}) => (
  <CommonPanel
    id={id}
    go={go}
    amountCoins={amountCoins}
    title="Промокоды"
    description={'Обменивай монеты на промокоды\nи делай покупки в СберМегаМаркете!'}
    isLoading={isLoading}
    isMobile={isMobile}
    withScrollbar
  >
    <div className={style['button-wrapper']}>
      <button
        type="button"
        className={style.button}
        onClick={() => go(null, 'myPromoCode')}
      >
        <Text className={style['button-text']}>
          Мои промокоды
        </Text>
      </button>
    </div>
    <PromoCodeCards amountCoins={amountCoins} onActivateModal={onActivateModal} />
  </CommonPanel>
);

PromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  onActivateModal: PropTypes.func,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default PromoCode;
