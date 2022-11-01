import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './MoreCoins.module.css';
import CommonPanel from '../../shared/commonPanel/CommonPanel';
import MoreCoinsCards from './components/MoreCoinsCards';
import Switcher from './components/Switcher';

const MoreCoins = ({
  id,
  go,
  amountCoins,
  circumstances,
  notificationStatus,
  onClickToCard,
  fetchedUser,
  isLoading,
  onUpdateNotificationStatus,
}) => {
  const [switcherState, setSwitcherState] = useState(notificationStatus ? +notificationStatus : 0);
  const pushSwitcherHandler = useCallback((e) => {
    const isActivePush = e.target.checked ? 1 : 0;
    onUpdateNotificationStatus(fetchedUser.id, isActivePush).then((res) => {
      setSwitcherState(+res);
    });
  }, [fetchedUser, onUpdateNotificationStatus]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Ещё монеты"
      description={'Выполняй задания –\nзарабатывай ещё больше монет!'}
      isLoading={isLoading}
    >
      <MoreCoinsCards circumstances={circumstances} onClickToCard={onClickToCard} />
      <div className={cn(style['more-coins-push-wrapper'])}>
        <div className={cn(style['more-coins-push-description-wrapper'])}>
          <Text className={cn(style['more-coins-push-description'])}>
            {'Подпишись на push,\nчтобы не пропустить новые игры'}
          </Text>
        </div>
        <Switcher onToggle={pushSwitcherHandler} state={switcherState} />
      </div>
    </CommonPanel>
  );
};

MoreCoins.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string,
  circumstances: PropTypes.string,
  notificationStatus: PropTypes.string,
  onClickToCard: PropTypes.func,
  fetchedUser: PropTypes.shape(),
  isLoading: PropTypes.bool,
  onUpdateNotificationStatus: PropTypes.func,
};

export default MoreCoins;
