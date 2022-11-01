/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

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
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  topPlayers,
  topPlayersFriends,
  getUserInfo,
}) => {
  const [positionOnRating, setPositionOnRating] = useState();
  const [gamersOnRating, setGamersOnRating] = useState();
  const [gamersListCommon, setGamersListCommon] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  const gamersListInFriends = useMemo(
    () => (friendList && fetchedUser && topPlayersFriends ? [{
      name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
      score: amountCoins,
      avatarSrc: fetchedUser.photo_100,
    }, ...topPlayersFriends.map((player) => {
      const userInfo = friendList.find((friend) => friend.id === +player.userId);
      return {
        name: `${userInfo?.first_name} ${userInfo?.last_name}`,
        score: player.coins,
        avatarSrc: userInfo?.photo_100,
      };
    })] : null),
    [friendList, fetchedUser, topPlayersFriends],
  );

  useEffect(() => {
    topPlayers.forEach((player) => {
      getUserInfo(+player.userId)
        .then((userInfo) => setGamersListCommon((prev) => ([
          ...prev,
          {
            name: `${userInfo?.first_name} ${userInfo?.last_name}`,
            score: player.coins,
            avatarSrc: userInfo?.photo_100,
          },
        ])));
    });
  }, [topPlayers, getUserInfo]);

  useEffect(() => { console.log('gamersListCommon', gamersListCommon); }, [gamersListCommon]);

  const ratingSwitcherHandler = useCallback((e) => {
    const isFriendsRating = !e.target.checked;
    const isAllRating = e.target.checked;

    if (isFriendsRating) {
      setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
      setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
      setCurrentGamersList(gamersListInFriends);
    }

    if (isAllRating) {
      setPositionOnRating(placeInLeaderBoard.orderNumber);
      setGamersOnRating(placeInLeaderBoard.totalUsersCount);
      setCurrentGamersList(gamersListCommon);
    }
  }, [placeInFriendsLeaderBoard, placeInLeaderBoard, gamersListCommon, gamersListInFriends]);

  useEffect(() => {
    setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
    setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
    setCurrentGamersList(gamersListInFriends);
  }, [placeInFriendsLeaderBoard, placeInLeaderBoard]);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Рейтинг"
      additionalBlock={(
        <Switcher onToggle={ratingSwitcherHandler} />
        )}
      isLoading={isLoading}
    >
      {currentGamersList.length > 0 && (
      <GamersList
        positionOnRating={positionOnRating}
        gamersOnRating={gamersOnRating}
        gamersList={currentGamersList}
      />
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
  placeInLeaderBoard: PropTypes.any,
  placeInFriendsLeaderBoard: PropTypes.any,
  topPlayers: PropTypes.any,
  topPlayersFriends: PropTypes.any,
  getUserInfo: PropTypes.func,
};

export default Rating;
