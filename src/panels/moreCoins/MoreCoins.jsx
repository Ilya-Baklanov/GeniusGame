import React, { useCallback } from 'react';
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
  userStat,
  onClickToCard,
  fetchedUser,
  isLoading,
}) => {
  const pushSwitcherHandler = useCallback((e) => {
    const isActivePush = e.target.checked ? 1 : 0;
    async function updateNotificationStatus(user) {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'localhost:8080',
        },
        dataType: 'json',
        body: JSON.stringify({
          userId: user,
          notifications: isActivePush,
        }),
      };
      await fetch('http://localhost:8080/v1/api/updateNotificationStatus', requestOptions);
    }
    // updateNotificationStatus(fetchedUser.id);
  }, [fetchedUser]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={userStat.coins}
      title="Ещё монеты"
      description="Выполняй задания –
      зарабатывай ещё больше монет!"
      isLoading={isLoading}
    >
      <MoreCoinsCards circumstances={userStat.circumstances} onClickToCard={onClickToCard} />
      <div className={cn(style['more-coins-push-wrapper'])}>
        <div className={cn(style['more-coins-push-description-wrapper'])}>
          <Text className={cn(style['more-coins-push-description'])}>
            {'Подпишись на push,\nчтобы не пропустить новые игры'}
          </Text>
        </div>
        <Switcher onToggle={pushSwitcherHandler} state={+userStat.notifications} />
      </div>
    </CommonPanel>
  );
};

MoreCoins.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  userStat: PropTypes.shape({
    circumstances: PropTypes.string,
    coins: PropTypes.string,
    gameCount: PropTypes.string,
    notifications: PropTypes.string,
    userId: PropTypes.string,
  }),
  onClickToCard: PropTypes.func,
  fetchedUser: PropTypes.shape(),
  isLoading: PropTypes.bool,
};

export default MoreCoins;
