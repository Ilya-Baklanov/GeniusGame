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
  getUserInfo,
  getTopPlayers,
  getTopPlayersFriends,
}) => {
  const [requestCache, setRequestCache] = useState({});
  const [positionOnRating, setPositionOnRating] = useState('');
  const [gamersOnRating, setGamersOnRating] = useState('');
  const [topPlayers, setTopPlayers] = useState([]);
  const [topPlayersFriends, setTopPlayersFriends] = useState([]);
  const [gamersListCommon, setGamersListCommon] = useState([]);
  const [gamersListInFriends, setGamersListInFriends] = useState([]);
  const [currentGamersList, setCurrentGamersList] = useState([]);

  useEffect(() => setRequestCache({}), [amountCoins]);

  useEffect(() => {
    if (
      placeInLeaderBoard
    ) {
      getTopPlayers(0, placeInLeaderBoard.totalUsersCount)
        .then((response) => {
          setTopPlayers(response);
        });
    }
  }, [placeInLeaderBoard]);

  useEffect(() => {
    console.log('topPlayers: ', topPlayers);
    if (topPlayers && fetchedUser) {
      topPlayers.forEach((player) => {
        if (+player.userId !== +fetchedUser.id) {
          setTimeout(() => {
            console.log('player: ', player);
            getUserInfo(+player.userId)
              .then((userInfo) => setGamersListCommon((prev) => {
                const playerInfo = {
                  name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                  score: player.coins,
                  avatarSrc: userInfo?.photo_100,
                  id: userInfo.id,
                };

                console.log('player: ', player);
                console.log('userInfo: ', userInfo);
                console.log('playerInfo: ', playerInfo);
                return [
                  ...prev,
                  playerInfo,
                ];
              }));
          }, 100);
        }
      });
    }
  }, [topPlayers, fetchedUser]);

  useEffect(() => {
    if (
      friendList
      && placeInFriendsLeaderBoard
      && fetchedUser
      && gamersListInFriends.length === 0
    ) {
      getTopPlayersFriends(friendList, 0, placeInFriendsLeaderBoard.totalUsersCount)
        .then((response) => {
          if (friendList && fetchedUser) {
            response.forEach((player) => {
              const userInfo = friendList.find((friend) => +player.userId === +friend.id);
              setGamersListInFriends((prev) => ([
                ...prev,
                {
                  name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                  score: player.coins,
                  avatarSrc: userInfo?.photo_100,
                  id: userInfo?.id,
                },
              ]));
            });
          }
        });
    }
  }, [friendList, placeInFriendsLeaderBoard, fetchedUser, gamersListInFriends]);

  const itemCount = useMemo(() => gamersOnRating, [gamersOnRating]);

  const personalStat = useMemo(() => ({
    name: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
    score: amountCoins,
    avatarSrc: fetchedUser.photo_100,
    id: fetchedUser.id,
  }), [fetchedUser, amountCoins]);

  // useEffect(
  //   () => {
  //     if (friendList && fetchedUser && topPlayersFriends) {
  //       topPlayersFriends.forEach((player) => {
  //         const userInfo = friendList.find((friend) => +player.userId === +friend.id);
  //         setGamersListInFriends((prev) => ([
  //           ...prev,
  //           {
  //             name: `${userInfo?.first_name} ${userInfo?.last_name}`,
  //             score: player.coins,
  //             avatarSrc: userInfo?.photo_100,
  //             id: userInfo.id,
  //           },
  //         ]));
  //       });
  //     }
  //   },
  //   [friendList, fetchedUser, topPlayersFriends],
  // );

  // useEffect(
  //   () => {
  //     if (topPlayers) {
  //       topPlayers.forEach((player) => {
  //         if (+player.userId !== +fetchedUser.id) {
  //           getUserInfo(+player.userId)
  //             .then((userInfo) => setGamersListCommon((prev) => ([
  //               ...prev,
  //               {
  //                 name: `${userInfo?.first_name} ${userInfo?.last_name}`,
  //                 score: player.coins,
  //                 avatarSrc: userInfo?.photo_100,
  //                 id: userInfo.id,
  //               },
  //             ])));
  //         }
  //       });
  //     }
  //   },
  //   [topPlayers, getUserInfo, fetchedUser],
  // );

  useEffect(() => {
    if (
      placeInFriendsLeaderBoard
      && placeInLeaderBoard
      && gamersListCommon
      && gamersListInFriends
    ) {
      if (isAllRating) {
        console.log('gamersListCommon: ', gamersListCommon);
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

  // useEffect(() => {
  //   if (
  //     placeInFriendsLeaderBoard
  //     && placeInFriendsLeaderBoard
  //     && gamersListInFriends
  //   ) {
  //     setPositionOnRating(placeInFriendsLeaderBoard.orderNumber);
  //     setGamersOnRating(placeInFriendsLeaderBoard.totalUsersCount);
  //     setCurrentGamersList(gamersListInFriends);
  //   }
  // }, [placeInFriendsLeaderBoard, placeInLeaderBoard, gamersListInFriends]);

  const loadMorePlayers = useCallback((visibleStartIndex, visibleStopIndex) => {
    const newCacheKey = `${visibleStartIndex}:${visibleStopIndex}:all`;
    if (requestCache[newCacheKey]) {
      return;
    }

    const length = visibleStopIndex - visibleStartIndex;
    const visibleRange = [...Array(length).keys()].map((x) => x + visibleStartIndex);
    const itemsRetrieved = visibleRange.every((index) => !!gamersListCommon?.[index]);

    if (itemsRetrieved) {
      setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
      return;
    }

    // eslint-disable-next-line consistent-return
    return getTopPlayers(visibleStartIndex, visibleStopIndex)
      .then((response) => {
        response.forEach((player) => {
          if (+player.userId !== +fetchedUser.id) {
            getUserInfo(+player.userId)
              .then((userInfo) => setGamersListCommon((prev) => ([
                ...prev,
                {
                  name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                  score: player.coins,
                  avatarSrc: userInfo?.photo_100,
                  id: userInfo.id,
                },
              ])));
          }
        });
        setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
        // setTopPlayers((prev) => [...response]);
      });
  }, [
    requestCache,
    fetchedUser,
    gamersListCommon,
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
        if (friendList && fetchedUser) {
          response.forEach((player) => {
            const userInfo = friendList.find((friend) => +player.userId === +friend.id);
            setGamersListInFriends((prev) => ([
              ...prev,
              {
                name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                score: player.coins,
                avatarSrc: userInfo?.photo_100,
                id: userInfo?.id,
              },
            ]));
          });
        }
        setRequestCache((prev) => ({ ...prev, [newCacheKey]: newCacheKey }));
        // setTopPlayersFriends((prev) => [...response]);
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

  useEffect(() => {
    console.log('currentGamersList: ', currentGamersList);
    console.log('currentGamersList.length: ', currentGamersList.length);
    console.log('gamersOnRating: ', gamersOnRating);
  }, [currentGamersList, gamersOnRating]);

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
        {/* <div className={cn(style.List)}>
          {
            currentGamersList
            && gamersOnRating
            && currentGamersList.length === gamersOnRating - 1 ? (
              <>
                {currentGamersList.map((item, index) => (
                  <div key={index + item.id} className={cn(style['gamers-list-item-wrapper'])}>
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
                ))}
              </>
              )
              : (<ScreenSpinner size="large" />)
            }
        </div> */}
        {/* <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={100}
          loadMoreItems={isAllRating ? loadMorePlayers : loadMorePlayersFriends}
        >
          {({ onItemsRendered, ref }) => ( */}
        {
              currentGamersList && (
              <List
                className={cn(style.List)}
                height={320}
                itemCount={gamersOnRating - 1}
                itemSize={62}
              // onItemsRendered={onItemsRendered}
              // ref={ref}
                width="100%"
              >
                {({ index, style: defaultStyle }) => {
                  const item = currentGamersList?.[index];

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
                }}
              </List>
              )
            }
        {/* //   )} */}
        {/* // </InfiniteLoader> */}
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
