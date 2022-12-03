import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

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
  isMobile,
}) => {
  const [switcherState, setSwitcherState] = useState(notificationStatus ? +notificationStatus : 0);
  const pushSwitcherHandler = useCallback(async (e) => {
    const isActivePush = e.target.checked ? 1 : 0;
    let result = false;

    if (isActivePush) {
      result = await bridge.send('VKWebAppAllowNotifications');
    } else {
      result = await bridge.send('VKWebAppDenyNotifications');
    }

    if (result) {
      onUpdateNotificationStatus(fetchedUser.id, isActivePush).then((res) => {
        setSwitcherState(+res);
      });
    }
  }, [fetchedUser, onUpdateNotificationStatus]);

  useEffect(() => {
    setSwitcherState(+notificationStatus);
  }, [notificationStatus]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Ещё монеты"
      description={'Выполняй задания –\nзарабатывай ещё больше монет!'}
      isLoading={isLoading}
      isMobile={isMobile}
    >
      <MoreCoinsCards circumstances={circumstances} onClickToCard={onClickToCard} />
      <div className={cn(style['additional-actions-wrapper'])}>
        <div className={cn(style['additional-actions'])}>
          {/* <div className={cn(style['additional-action'])}>
            <div className={cn(style['additional-action-description-wrapper'])}>
              <Text className={cn(style['additional-action-description'])}>
                Пригласи к участию друзей
              </Text>
            </div>
            <button
              onClick={() => onClickToCard('INVITE_FRIENDS')}
              className={cn(style['additional-action-invite-friends-button'])}
              type="button"
            >
              <Text className={cn(style['additional-action-invite-friends-text'])}>
                Кликни
              </Text>
            </button>
          </div> */}
          <div className={cn(style['additional-action'])}>
            <div className={cn(style['additional-action-description-wrapper'])}>
              <Text className={cn(style['additional-action-description'])}>
                {'Подпишись на push,\nчтобы не пропустить новые игры'}
              </Text>
            </div>
            <Switcher onToggle={pushSwitcherHandler} state={switcherState} />
          </div>
        </div>
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
  isMobile: PropTypes.bool,
};

export default MoreCoins;
