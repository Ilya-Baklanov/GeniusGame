/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Avatar, Text, ScreenSpinner } from '@vkontakte/vkui';

import style from './GamersList.module.css';
import { MoreCoins } from '../../../assets/image';

const GamersList = ({
  amountCoins,
  isAllRating,
  friendList,
  fetchedUser,
  placeInLeaderBoard,
  placeInFriendsLeaderBoard,
  getTopPlayers,
  getTopPlayersFriends,
}) => {
  const [requestCache, setRequestCache] = useState({});
  const [positionOnRating, setPositionOnRating] = useState('');
  const [gamersOnRating, setGamersOnRating] = useState('');
  const [gamersListCommon, setGamersListCommon] = useState([]);
  const [gamersListInFriends, setGamersListInFriends] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  useEffect(() => setRequestCache({}), [amountCoins]);

  const itemCount = useMemo(() => gamersOnRating, [gamersOnRating]);

  const personalStat = useMemo(() => ({
    name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
    score: amountCoins,
    avatarSrc: fetchedUser.photo_100,
    id: fetchedUser.id,
  }), [fetchedUser, amountCoins]);

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
        setCurrentGamersList(gamersListCommon
          .filter((player) => +player.id !== +fetchedUser.id));
      } else {
        setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
        setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
        setCurrentGamersList(gamersListInFriends
          .filter((player) => +player.id !== +fetchedUser.id));
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

  const loadMorePlayers = useCallback((visibleStartIndex, visibleStopIndex) => {
    const startNumber = +visibleStartIndex;
    const endNumber = +visibleStopIndex + 1 < +gamersOnRating ? visibleStopIndex : gamersOnRating;
    const newCacheKey = `${startNumber}:${endNumber}:all`;
    console.log('requestCache: ', requestCache);
    console.log('visibleStartIndex: ', visibleStartIndex);
    console.log('visibleStopIndex: ', visibleStopIndex);
    console.log('gamersOnRating: ', gamersOnRating);
    if (requestCache[newCacheKey] || visibleStartIndex >= endNumber) {
      return;
    }

    const length = endNumber - startNumber;
    const visibleRange = [...Array(length >= 0 ? length : 0).keys()].map((x) => x + startNumber);
    const itemsRetrieved = visibleRange.every((index) => !!gamersListCommon?.[index]);

    console.log('length: ', length);
    console.log('visibleRange: ', visibleRange);
    console.log('itemsRetrieved: ', itemsRetrieved);

    if (itemsRetrieved) {
      setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      return;
    }

    // eslint-disable-next-line consistent-return
    return getTopPlayers(
      startNumber,
      endNumber,
    )
      .then((response) => {
        setGamersListCommon((prev) => ([
          ...prev,
          ...response
            .map((player) => ({
              name: `${player?.firstName} ${player?.secondName}`,
              score: player.coins,
              avatarSrc: player?.photo,
              id: player.id,
            })),
        ]));
        setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      });
  }, [
    requestCache,
    fetchedUser,
    gamersListCommon,
    gamersOnRating,
  ]);

  const loadMorePlayersFriends = useCallback((visibleStartIndex, visibleStopIndex) => {
    const newCacheKey = `${visibleStartIndex}:${visibleStopIndex}:friends`;
    if (requestCache[newCacheKey]) {
      return;
    }

    const length = visibleStopIndex - visibleStartIndex;
    const visibleRange = [...Array(length).keys()].map((x) => x + visibleStartIndex);
    const itemsRetrieved = visibleRange.every((index) => !!gamersListInFriends?.[index]);

    if (itemsRetrieved) {
      setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      return;
    }

    // eslint-disable-next-line consistent-return
    return getTopPlayersFriends(friendList, visibleStartIndex, visibleStopIndex)
      .then((response) => {
        setGamersListInFriends((prev) => ([
          ...prev,
          ...response
            .map((player) => ({
              name: `${player?.firstName} ${player?.secondName}`,
              score: player.coins,
              avatarSrc: player?.photo,
              id: player.id,
            })),
        ]));
        setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      });
  }, [
    requestCache,
    friendList,
    fetchedUser,
    gamersListInFriends,
  ]);

  const isItemLoaded = useCallback(
    (index) => (isAllRating
      ? !!gamersListCommon?.[index]
      : !!gamersListInFriends?.[index]),
    [gamersListCommon, gamersListInFriends, isAllRating],
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
          loadMoreItems={isAllRating ? loadMorePlayers : loadMorePlayersFriends}
        >
          {
              ({ onItemsRendered, ref }) => (
                <List
                  className={cn(style.List)}
                  height={320}
                  itemCount={itemCount}
                  itemSize={62}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width="100%"
                >
                  { currentGamersList.length > 0
                    ? (
                      ({ index, style: defaultStyle }) => {
                        const item = currentGamersList[index];

                        return item ? (
                          <div
                            style={defaultStyle}
                            key={index + item.id}
                            className={cn(style['gamers-list-item-wrapper'])}
                          >
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
                      }
                    )
                    : () => (gamersOnRating <= 1
                      ? null
                      : (<ScreenSpinner size="large" />))}
                </List>
              )
            }
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
  getTopPlayers: PropTypes.func,
  getTopPlayersFriends: PropTypes.func,
};

export default GamersList;
