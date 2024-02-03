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
import { MoreCoins } from '../../../assets/image';

const RATING_LIMIT = 1000;

const GamersList = ({
  amountCoins,
  isAllRating,
  friendList,
  fetchedUser,
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  getTopPlayers,
  getTopPlayersFriends,
  allowed,
}) => {
  const [positionOnRating, setPositionOnRating] = useState('');
  const [gamersOnRating, setGamersOnRating] = useState('');
  const [gamersListCommon, setGamersListCommon] = useState([]);
  const [gamersListInFriends, setGamersListInFriends] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  const itemCount = useMemo(
    () => (currentGamersList.length > RATING_LIMIT
      ? RATING_LIMIT
      : currentGamersList.length),
    [currentGamersList],
  );

  const personalStat = useMemo(() => {
    if (
      fetchedUser
      && gamersListInFriends.length > 0
    ) {
      const allUserCoins = gamersListInFriends.find(
        (player) => +player.id === fetchedUser.id,
      );

      return {
        name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
        score: allUserCoins ? allUserCoins.score : 0,
        avatarSrc: fetchedUser.photo_100,
        id: fetchedUser.id,
      };
    }
    return null;
  }, [fetchedUser, gamersListInFriends, isAllRating]);

  useEffect(() => {
    if (placeInLeaderBoard && gamersListCommon && isAllRating && fetchedUser) {
      setPositionOnRating(placeInLeaderBoard.orderNumber);
      setGamersOnRating(placeInLeaderBoard.totalUsersCount);
      setCurrentGamersList(
        gamersListCommon.filter((player) => +player.id !== +fetchedUser.id),
      );
    }
  }, [placeInLeaderBoard, gamersListCommon, isAllRating, fetchedUser]);

  useEffect(() => {
    if (
      placeInFriendsLeaderBoard
      && gamersListInFriends
      && !isAllRating
      && fetchedUser
    ) {
      setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
      setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
      setCurrentGamersList(
        gamersListInFriends.filter((player) => +player.id !== +fetchedUser.id),
      );
    }
  }, [
    placeInFriendsLeaderBoard,
    gamersListInFriends,
    isAllRating,
    fetchedUser,
  ]);

  useEffect(() => {
    getTopPlayers(0, RATING_LIMIT)
      .then((response) => {
        if (response) {
          setGamersListCommon((prev) => [
            ...prev,
            ...response.map((player) => ({
              name: `${player?.firstName} ${player?.secondName}`,
              score: player.coins,
              avatarSrc: player?.photo,
              id: player.id,
            })),
          ]);
        }
      })
      .catch((error) => console.error('getTopPlayers_error', error));
    getTopPlayersFriends(friendList, 0, RATING_LIMIT)
      .then((response) => {
        if (response) {
          setGamersListInFriends((prev) => [
            ...prev,
            ...response.map((player) => ({
              name: `${player?.firstName} ${player?.secondName}`,
              score: player.coins,
              avatarSrc: player?.photo,
              id: player.id,
            })),
          ]);
        }
      })
      .catch((error) => console.error('getTopPlayersFriends_error', error));
  }, [friendList, isAllRating]);

  return (
    (allowed || isAllRating) && (
      <div className={cn(style['gamers-list-wrapper'])}>
        <div className={cn(style['position-on-rating-wrapper'])}>
          <Text className={cn(style['position-on-rating-your'])}>
            {`Вы ${positionOnRating}`}
          </Text>
          <Text className={cn(style['position-on-rating-all'])}>
            {`/ ${gamersOnRating}`}
          </Text>
        </div>
        <div className={cn(style['gamers-list-container'])}>
          {personalStat && (
            <div className={cn(style['gamers-list-item-wrapper-first'])}>
              <div className={cn(style['gamers-list-item'])}>
                <div className={cn(style['gamers-list-item-user-info'])}>
                  <Avatar
                    src={personalStat.avatarSrc}
                    className={cn(style['gamers-list-item-avatar'])}
                    size={54}
                  />
                  <div className={cn(style['gamers-list-item-name-wrapper'])}>
                    <Text className={cn(style['gamers-list-item-name'])}>
                      {personalStat.name}
                    </Text>
                  </div>
                </div>
                <div className={cn(style['gamers-list-item-score-wrapper'])}>
                  <Text className={cn(style['gamers-list-item-score'])}>
                    {personalStat.score}
                  </Text>
                  <MoreCoins />
                </div>
              </div>
            </div>
          )}
          <List
            className={cn(style.List)}
            height={350}
            itemCount={itemCount}
            itemSize={62}
            width="100%"
          >
            {currentGamersList.length > 0
              ? ({ index, style: defaultStyle }) => {
                const item = currentGamersList[index];

                return item ? (
                  <div
                    style={defaultStyle}
                    key={index + item.id}
                    className={cn(style['gamers-list-item-wrapper'])}
                  >
                    <div className={cn(style['gamers-list-item'])}>
                      <div
                        className={cn(style['gamers-list-item-user-info'])}
                      >
                        <Avatar
                          src={item.avatarSrc}
                          className={cn(style['gamers-list-item-avatar'])}
                          size={54}
                        />
                        <div
                          className={cn(
                            style['gamers-list-item-name-wrapper'],
                          )}
                        >
                          <Text
                            className={cn(style['gamers-list-item-name'])}
                          >
                            {item.name}
                          </Text>
                        </div>
                      </div>
                      <div
                        className={cn(
                          style['gamers-list-item-score-wrapper'],
                        )}
                      >
                        <Text className={cn(style['gamers-list-item-score'])}>
                          {item.score}
                        </Text>
                        <MoreCoins />
                      </div>
                    </div>
                  </div>
                ) : null;
              }
              : () => (+gamersOnRating <= 1 ? null : <ScreenSpinner size="large" />)}
          </List>
        </div>
      </div>
    )
  );
};

GamersList.propTypes = {
  amountCoins: PropTypes.string,
  isAllRating: PropTypes.bool,
  friendList: PropTypes.any,
  fetchedUser: PropTypes.any,
  placeInLeaderBoard: PropTypes.any,
  placeInFriendsLeaderBoard: PropTypes.any,
  getTopPlayers: PropTypes.func,
  getTopPlayersFriends: PropTypes.func,
  allowed: PropTypes.bool,
};

export default GamersList;
