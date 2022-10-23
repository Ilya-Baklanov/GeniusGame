import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './MoreCoins.css';
import { Text } from '@vkontakte/vkui';
import CommonPanel from '../../shared/commonPanel/CommonPanel';
import MoreCoinsCards from './components/MoreCoinsCards';
import Switcher from './components/Switcher';

const MoreCoins = ({
  id,
  go,
  amountCoins,
  onClickToCard,
}) => {
  const pushSwitcherHandler = useCallback((e) => {
    const isActivePush = e.target.checked;
  }, []);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Ещё монеты"
      description="Выполняй задания –
      зарабатывай ещё больше монет!"
    >
      <MoreCoinsCards onClickToCard={onClickToCard} />
      <div className="more-coins-push-wrapper">
        <div className="more-coins-push-description-wrapper">
          <Text className="more-coins-push-description">
            {'Подпишись на push,\nчтобы не пропустить новые игры'}
          </Text>
        </div>
        <Switcher onToggle={pushSwitcherHandler} />
      </div>
    </CommonPanel>
  );
};

MoreCoins.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  onClickToCard: PropTypes.func,
};

export default MoreCoins;
