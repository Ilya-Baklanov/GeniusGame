/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useState, useMemo, useEffect, memo,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Avatar, Text, ScreenSpinner } from '@vkontakte/vkui';

import style from './GamersList.module.css';
import { FriendsMark, MoreCoins, PersonalMark } from '../../../assets/image';
import { RATING_LIMIT } from '../../../assets/constants/constants';

const GamersList = ({
  amountCoins,
  isAllRating,
  friendsIdList,
  fetchedUser,
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  topPlayers,
  topPlayersFriends,
  // allowed,
}) => {
  const [positionOnRating, setPositionOnRating] = useState('');
  const [gamersOnRating, setGamersOnRating] = useState('');
  // const [gamersListCommon, setGamersListCommon] = useState([]);
  // const [gamersListInFriends, setGamersListInFriends] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  const itemCount = useMemo(
    () => (currentGamersList.length > RATING_LIMIT
      ? RATING_LIMIT
      : currentGamersList.length),
    [currentGamersList],
  );

  const personalStat = useMemo(() => {
    if (fetchedUser) {
      return {
        firstName: fetchedUser.first_name,
        secondName: fetchedUser.last_name,
        coins: amountCoins ?? 0,
        photo: fetchedUser.photo_100,
        id: fetchedUser.id,
      };
    }
    return null;
  }, [fetchedUser, amountCoins]);

  useEffect(() => {
    if (isAllRating) {
      const allGamersList = topPlayers && topPlayers.length > 0
        ? topPlayers.filter((player) => String(player.id) !== String(fetchedUser.id))
        : [];
      setPositionOnRating(placeInLeaderBoard?.orderNumber ?? 0);
      setGamersOnRating(placeInLeaderBoard?.totalUsersCount ?? 0);
      setCurrentGamersList([personalStat, ...allGamersList]);
    } else {
      const friendsGamersList = topPlayersFriends && topPlayersFriends.length > 0
        ? topPlayersFriends.filter((player) => String(player.id) !== String(fetchedUser.id))
        : [];

      setPositionOnRating(placeInFriendsLeaderBoard?.orderNumber ?? 0);
      setGamersOnRating(placeInFriendsLeaderBoard?.totalUsersCount ?? 0);
      setCurrentGamersList([personalStat, ...friendsGamersList]);
    }
  }, [
    isAllRating,
    fetchedUser,
    placeInLeaderBoard,
    topPlayers,
    placeInFriendsLeaderBoard,
    topPlayersFriends,
    personalStat,
  ]);

  return (
  // (allowed || isAllRating) && (
  // (isAllRating) && (
  // <div className={cn(style['gamers-list-wrapper'])}>
  // <div className={cn(style['gamers-list-container'])}>
    <List
      className={cn(style.List)}
      height={900}
      itemCount={itemCount}
      itemSize={50}
      width="100%"
    >
      {currentGamersList.length > 0
        ? ({ index, style: defaultStyle }) => {
          const gamerInfo = currentGamersList[index];
          const isPersonalInfo = String(gamerInfo.id) === String(fetchedUser.id);
          const isFriend = friendsIdList?.includes(String(gamerInfo.id));

          return gamerInfo ? (
            <div
              style={defaultStyle}
              key={index + gamerInfo.id}
              className={cn(style['gamers-list-item-wrapper'])}
            >
              <div className={cn(style['gamers-list-item'])}>
                <div
                  className={cn(style['gamers-list-item-user-info'])}
                >
                  <Avatar
                    src={gamerInfo.photo}
                    className={cn(style['gamers-list-item-avatar'])}
                    size={34}
                  />
                  <Text
                    className={cn(style['gamers-list-item-name'], {
                      [style.personal_info]: isPersonalInfo,
                    })}
                  >
                    {`${gamerInfo.firstName} ${gamerInfo.secondName}`}
                  </Text>
                  {isFriend && <FriendsMark />}
                  {isPersonalInfo && <PersonalMark />}
                </div>
                <div
                  className={cn(
                    style['gamers-list-item-score-wrapper'],
                  )}
                >
                  <MoreCoins />
                  <Text className={cn(style['gamers-list-item-score'])}>
                    {gamerInfo.coins}
                  </Text>
                </div>
              </div>
            </div>
          ) : null;
        }
        : () => (+gamersOnRating <= 1 ? null : <ScreenSpinner size="large" />)}
    </List>
  // </div>
  // </div>
  // )
  );
};

GamersList.propTypes = {
  amountCoins: PropTypes.string,
  isAllRating: PropTypes.bool,
  friendsIdList: PropTypes.arrayOf(PropTypes.string),
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_100: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  placeInLeaderBoard: PropTypes.any,
  placeInFriendsLeaderBoard: PropTypes.any,
  // allowed: PropTypes.bool,
  topPlayers: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string,
    id: PropTypes.number,
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    coins: PropTypes.number,
  })),
  topPlayersFriends: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string,
    id: PropTypes.number,
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    coins: PropTypes.number,
  })),
};

export default GamersList;
