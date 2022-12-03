/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import { ScreenSpinner, Text } from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import GamersList from './components/GamersList';
import Switcher from './components/Switcher';
import style from './Rating.module.css';

const Rating = ({
  id,
  go,
  amountCoins,
  isLoading,
  // friendList,
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
  const [isAllRating, setIsAllRating] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [friendList, setFriendList] = useState([]);

  const permissionRequest = useCallback(async () => {
    const permissions = await getAllowed('friends');

    const friendsAllowed = permissions.find((permission) => permission.scope === 'friends').allowed;

    setAllowed(friendsAllowed);
    return friendsAllowed;
  }, []);

  useEffect(() => {
    permissionRequest();
  }, []);

  const ratingSwitcherHandler = useCallback((e) => {
    setIsAllRating(e.target.checked);
  }, []);

  const fetchFriendsList = useCallback(async (user) => {
    const friendsToken = await fetchFriendsToken(user);
    if (friendsToken) {
      const friendsAllowed = await permissionRequest();
      if (friendsAllowed) {
        const friendListRequest = await getFriendList(friendsToken);
        setFriendList(friendListRequest);
        return friendListRequest;
      }
    }
    return null;
  }, [fetchFriendsToken, permissionRequest, getFriendList]);

  // useEffect(() => {
  //   // if (friendList && !allowed) {
  //   //   window.location.reload();
  //   // }
  // }, [allowed, friendList]);

  const getFriendsRatingData = useCallback(async (user) => {
    const friendListRequest = await fetchFriendsList(user);
    if (friendListRequest) {
      getPlaceInFriendsLeaderBoard(user, friendListRequest);
    }
  }, [fetchFriendsList]);

  // useEffect(() => {
  //   if (fetchedUser) {
  //   }
  // }, [fetchedUser]);

  useEffect(() => {
    if (fetchedUser) {
      if (!isAllRating) {
        getFriendsRatingData(fetchedUser);
      }

      getPlaceInLeaderBoard(fetchedUser);
    }
  }, [fetchedUser, isAllRating]);

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
      {placeInLeaderBoard
      && (isAllRating ? true : placeInFriendsLeaderBoard)
      && fetchedUser
      && (isAllRating ? true : friendList.length > 0)
      && (
      <GamersList
        amountCoins={amountCoins}
        isAllRating={isAllRating}
        friendList={friendList}
        fetchedUser={fetchedUser}
        placeInLeaderBoard={placeInLeaderBoard}
        placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
        getTopPlayers={getTopPlayers}
        getTopPlayersFriends={getTopPlayersFriends}
        allowed={allowed}
      />
      )}
      {!allowed && !isAllRating && (
      <div className={style['not-allowed-to-friends-list-wrapper']}>
        <div className={style['not-allowed-to-friends-list']}>
          <Text className={style['not-allowed-to-friends-list-description']}>
            {'Рейтинг друзей доступен,\nесли ты подтвердил запрос\nна доступ к друзьям.'}
          </Text>
          <button
            type="button"
            onClick={() => getFriendsRatingData()}
            className={style['not-allowed-to-friends-list-button']}
          >
            <Text className={style['not-allowed-to-friends-list-button-text']}>
              Доступ к друзьям
            </Text>
          </button>
        </div>
      </div>
      )}
    </CommonPanel>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  // friendList: PropTypes.any,
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
