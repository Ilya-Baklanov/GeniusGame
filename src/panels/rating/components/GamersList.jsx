/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Avatar, Text } from '@vkontakte/vkui';

import style from './GamersList.module.css';
import { MoreCoins } from '../../../assets/image';

const GamersList = ({
  amountCoins,
  isAllRating,
  friendList,
  fetchedUser,
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  getUserInfo,
  getTopPlayers,
  getTopPlayersFriends,
}) => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [topPlayersFriends, setTopPlayersFriends] = useState([]);
  const [requestCache, setRequestCache] = useState({});
  const [positionOnRating, setPositionOnRating] = useState('');
  const [gamersOnRating, setGamersOnRating] = useState('');
  const [gamersListCommon, setGamersListCommon] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  useEffect(() => setRequestCache({}), [amountCoins]);

  const itemCount = useMemo(() => gamersOnRating || 25, [gamersOnRating]);

  const personalStat = useMemo(() => ({
    name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
    score: amountCoins,
    avatarSrc: fetchedUser.photo_100,
    id: fetchedUser.id,
  }), [fetchedUser, amountCoins]);

  const gamersListInFriends = useMemo(
    () => (friendList && fetchedUser && topPlayersFriends
      ? topPlayersFriends
        .map((player) => {
          const userInfo = friendList.find((friend) => friend.id === +player.userId);
          return {
            name: `${userInfo?.first_name} ${userInfo?.last_name}`,
            score: player.coins,
            avatarSrc: userInfo?.photo_100,
            id: userInfo.id,
          };
        })
      : null),
    [friendList, fetchedUser, topPlayersFriends],
  );

  useEffect(() => {
    if (topPlayers) {
      topPlayers.forEach((player) => {
        if (+player.userId !== +fetchedUser.id) {
          getUserInfo(+player.userId)
            .then((userInfo) => setGamersListCommon((prev) => {
              console.log('PREV_USER_INFO: ', prev);

              return ([
                ...prev,
                {
                  name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                  score: player.coins,
                  avatarSrc: userInfo?.photo_100,
                  id: userInfo.id,
                },
              ]);
            }));
        }
      });
    }
  }, [topPlayers, getUserInfo, fetchedUser]);

  useEffect(() => {
    if (
      placeInFriendsLeaderBoard
      && placeInLeaderBoard
      && gamersListCommon
      && gamersListInFriends
    ) {
      if (isAllRating) {
        setPositionOnRating(placeInLeaderBoard.orderNumber);
        setGamersOnRating(placeInLeaderBoard.totalUsersCount);
        setCurrentGamersList(gamersListCommon);
      } else {
        setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
        setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
        setCurrentGamersList(gamersListInFriends);
      }
    }
  }, [
    placeInFriendsLeaderBoard,
    placeInLeaderBoard,
    gamersListCommon,
    gamersListInFriends,
    isAllRating,
    fetchedUser,
  ]);

  useEffect(() => {
    if (
      placeInFriendsLeaderBoard
      && placeInFriendsLeaderBoard
      && gamersListInFriends
    ) {
      setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
      setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
      setCurrentGamersList(gamersListInFriends);
    }
  }, [placeInFriendsLeaderBoard, placeInLeaderBoard, gamersListInFriends]);

  const loadMoreItems = useCallback((visibleStartIndex, visibleStopIndex) => {
    const newCacheKey = `${visibleStartIndex}:${visibleStopIndex}:${isAllRating ? 'all' : 'friends'}`;
    if (requestCache[newCacheKey]) {
      return;
    }

    const length = visibleStopIndex - visibleStartIndex;
    const visibleRange = [...Array(length).keys()].map((x) => x + visibleStartIndex);
    const itemsRetrieved = visibleRange.every((index) => (isAllRating
      ? !!topPlayers?.[index]
      : !!topPlayersFriends?.[index]));

    if (itemsRetrieved) {
      setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      return;
    }

    // eslint-disable-next-line consistent-return
    return isAllRating
      ? getTopPlayers(visibleStartIndex, visibleStopIndex)
        .then((response) => setTopPlayers((prev) => [...prev, ...response]))
      : getTopPlayersFriends(friendList, visibleStartIndex, visibleStopIndex)
        .then((response) => setTopPlayersFriends((prev) => [...prev, ...response]));
  }, [requestCache, friendList, topPlayers, topPlayersFriends, isAllRating]);

  const isItemLoaded = useCallback(
    (index) => (isAllRating
      ? !!topPlayers?.[index]
      : !!topPlayersFriends?.[index]),
    [topPlayers, topPlayersFriends, isAllRating],
  );

  return (
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
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className={cn(style.List)}
              height={320}
              itemCount={itemCount}
              itemSize={62}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width="100%"
            >
              {({ index, style: defaultStyle }) => {
                const item = currentGamersList?.[index];

                return item ? (
                  <div style={defaultStyle} key={index} className={cn(style['gamers-list-item-wrapper'])}>
                    <div className={cn(style['gamers-list-item'])}>
                      <div className={cn(style['gamers-list-item-user-info'])}>
                        <Avatar
                          src={item.avatarSrc}
                          className={cn(style['gamers-list-item-avatar'])}
                          size={54}
                        />
                        <div className={cn(style['gamers-list-item-name-wrapper'])}>
                          <Text className={cn(style['gamers-list-item-name'])}>
                            {item.name}
                          </Text>
                        </div>
                      </div>
                      <div className={cn(style['gamers-list-item-score-wrapper'])}>
                        <Text className={cn(style['gamers-list-item-score'])}>
                          {item.score}
                        </Text>
                        <MoreCoins />
                      </div>
                    </div>
                  </div>
                ) : null;
              }}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  );
};

GamersList.propTypes = {
  amountCoins: PropTypes.string,
  isAllRating: PropTypes.bool,
  friendList: PropTypes.any,
  fetchedUser: PropTypes.any,
  placeInLeaderBoard: PropTypes.any,
  placeInFriendsLeaderBoard: PropTypes.any,
  getUserInfo: PropTypes.func,
  getTopPlayers: PropTypes.func,
  getTopPlayersFriends: PropTypes.func,
};

export default GamersList;
