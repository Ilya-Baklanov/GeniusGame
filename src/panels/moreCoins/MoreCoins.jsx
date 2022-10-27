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
  fetchedUser,
  notificationsState,
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
    updateNotificationStatus(fetchedUser.id);
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
        <Switcher onToggle={pushSwitcherHandler} state={notificationsState} />
      </div>
    </CommonPanel>
  );
};

MoreCoins.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  onClickToCard: PropTypes.func,
  fetchedUser: PropTypes.string.isRequired,
  notificationsState: PropTypes.string.isRequired,
};

export default MoreCoins;
