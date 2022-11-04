/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useState,
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
  getUserInfo,
  getTopPlayers,
  getTopPlayersFriends,
}) => {
  const [isAllRating, setIsAllRating] = useState(false);

  const ratingSwitcherHandler = useCallback((e) => {
    setIsAllRating(e.target.checked);
  }, []);

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
      <GamersList
        amountCoins={amountCoins}
        isAllRating={isAllRating}
        friendList={friendList}
        fetchedUser={fetchedUser}
        placeInLeaderBoard={placeInLeaderBoard}
        placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
        getUserInfo={getUserInfo}
        getTopPlayers={getTopPlayers}
        getTopPlayersFriends={getTopPlayersFriends}
      />
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
  getUserInfo: PropTypes.func,
  getTopPlayers: PropTypes.func,
  getTopPlayersFriends: PropTypes.func,
};

export default Rating;
