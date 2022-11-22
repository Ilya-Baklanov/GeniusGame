/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import { ScreenSpinner } from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import GamersList from './components/GamersList';
import Switcher from './components/Switcher';

const Rating = ({
  id,
  go,
  amountCoins,
  isLoading,
  friendList,
  fetchedUser,
  getPlaceInLeaderBoard,
  getPlaceInFriendsLeaderBoard,
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  getTopPlayers,
  getTopPlayersFriends,
  isMobile,
  getFriendList,
  fetchFriendsToken,
  getAllowed,
}) => {
  const [isAllRating, setIsAllRating] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(async () => {
    const permissions = await getAllowed('friends');

    setAllowed(permissions.find((permission) => permission.scope === 'friends').allowed);
  }, []);

  const ratingSwitcherHandler = useCallback((e) => {
    setIsAllRating(e.target.checked);
  }, []);

  const fetchFriendsList = useCallback(async (user) => {
    const friendsToken = await fetchFriendsToken(user);
    if (friendsToken) {
      getFriendList(friendsToken);
      setAllowed(true);
    }
  }, []);

  useEffect(() => {
    if (fetchedUser && !friendList) {
      fetchFriendsList(fetchedUser);
    }
    if (fetchedUser && friendList) {
      getPlaceInLeaderBoard(fetchedUser);
      getPlaceInFriendsLeaderBoard(fetchedUser, friendList);
    }
  }, [fetchedUser, friendList]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Рейтинг"
      additionalBlock={(
        <Switcher onToggle={ratingSwitcherHandler} isAllRating={isAllRating} />
        )}
      isLoading={isLoading}
      isMobile={isMobile}
    >
      {allowed
      && friendList
      && placeInLeaderBoard
      && placeInFriendsLeaderBoard ? (
        <GamersList
          amountCoins={amountCoins}
          isAllRating={isAllRating}
          friendList={friendList}
          fetchedUser={fetchedUser}
          placeInLeaderBoard={placeInLeaderBoard}
          placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
          getTopPlayers={getTopPlayers}
          getTopPlayersFriends={getTopPlayersFriends}
        />
        )
        : (<ScreenSpinner size="large" />)}
    </CommonPanel>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  friendList: PropTypes.any,
  fetchedUser: PropTypes.any,
  getPlaceInLeaderBoard: PropTypes.func,
  getPlaceInFriendsLeaderBoard: PropTypes.func,
  placeInLeaderBoard: PropTypes.any,
  placeInFriendsLeaderBoard: PropTypes.any,
  getTopPlayers: PropTypes.func,
  getTopPlayersFriends: PropTypes.func,
  isMobile: PropTypes.bool,
  getFriendList: PropTypes.func,
  fetchFriendsToken: PropTypes.func,
  getAllowed: PropTypes.func,
};

export default Rating;
