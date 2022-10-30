import React from 'react';
import PropTypes from 'prop-types';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import PromoCodeCards from './components/PromoCodeCards';

const PromoCode = ({
  id, go, amountCoins, onActivateModal, isLoading,
}) => (
  <CommonPanel
    id={id}
    go={go}
    amountCoins={amountCoins}
    title="Промокоды"
    description="Обменивай монеты на промокоды
  и делай покупки в СберМегаМаркете!"
    isLoading={isLoading}
  >
    <PromoCodeCards amountCoins={amountCoins} onActivateModal={onActivateModal} />
  </CommonPanel>
);

PromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  onActivateModal: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default PromoCode;
