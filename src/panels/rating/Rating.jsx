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
  allowed,
}) => {
  const [isAllRating, setIsAllRating] = useState(false);

  const ratingSwitcherHandler = useCallback((e) => {
    setIsAllRating(e.target.checked);
  }, []);

  const fetchFriendsList = useCallback(async (user) => {
    const friendsToken = await fetchFriendsToken(user);
    if (friendsToken) {
      getFriendList(friendsToken);
    }
  }, [allowed]);

  useEffect(() => {
    // if (friendList && !allowed) {
    //   window.location.reload();
    // }
  }, [allowed, friendList]);

  const getFriendsRatingData = useCallback(() => {
    if (fetchedUser && !friendList) {
      fetchFriendsList(fetchedUser);
    }
    if (fetchedUser && friendList) {
      getPlaceInFriendsLeaderBoard(fetchedUser, friendList);
    }
  }, [fetchedUser, friendList]);

  const getAllRatingData = useCallback(() => {
    if (fetchedUser) {
      getPlaceInLeaderBoard(fetchedUser);
    }
  }, [fetchedUser]);

  useEffect(() => {
    getFriendsRatingData();
  }, [getFriendsRatingData]);

  useEffect(() => {
    getAllRatingData();
  }, [getAllRatingData]);

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
  allowed: PropTypes.bool,
};

export default Rating;
