/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Avatar,
  Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, Text,
  usePlatform,
} from '@vkontakte/vkui';

import CommonPanel from '../../shared/commonPanel/CommonPanel';
import GamersList from './components/GamersList';
import Switcher from './components/Switcher';
import style from './Rating.module.css';
import { APP_NAME, RATING_LIMIT } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';
import Navbar from '../../shared/navbar/Navbar';
import { MoreCoins } from '../../assets/image';
import MainButton from '../../shared/mainButton/MainButton';

const Rating = ({
  id,
  go,
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
  topPlayers,
  topPlayersFriends,
}) => {
  const [isAllRating, setIsAllRating] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const platform = usePlatform();

  const allUserCoins = String(topPlayers?.find(
    (player) => +player.id === fetchedUser.id,
  )?.coins);

  const friendsIdList = friendList?.map((friends) => String(friends.id));

  const placeInRate = isAllRating ? placeInLeaderBoard : placeInFriendsLeaderBoard;

  const topPlayersList = isAllRating ? topPlayers : topPlayersFriends;

  const permissionRequest = useCallback(async () => {
    const permissions = await getAllowed('friends');

    const friendsAllowed = permissions?.find((permission) => permission.scope === 'friends').allowed;

    setAllowed(friendsAllowed);
    return friendsAllowed;
  }, []);

  useEffect(() => {
    permissionRequest();
  }, []);

  const ratingSwitcherHandler = useCallback((e) => {
    setIsAllRating(!e.target.checked);
  }, []);

  const fetchFriendsList = useCallback(async (user) => {
    const friendsToken = await fetchFriendsToken(user);
    if (friendsToken) {
      setAllowed(true);

      const fetchedFriendList = await getFriendList(friendsToken);

      return fetchedFriendList;
      // }
    }
    return null;
  }, [fetchFriendsToken, getFriendList]);

  const getFriendsRatingData = useCallback(async (user) => {
    const fetchedFriendList = await fetchFriendsList(user);
    if (fetchedFriendList) {
      await getPlaceInFriendsLeaderBoard(user, fetchedFriendList);
      await getTopPlayersFriends(fetchedFriendList, user, 0, RATING_LIMIT);
    }
  }, []);

  useEffect(() => {
    if (fetchedUser) {
      if (!isAllRating && (!topPlayersFriends || !placeInFriendsLeaderBoard)) {
        getFriendsRatingData(fetchedUser);
      }
    }
  }, [fetchedUser, isAllRating, topPlayersFriends, placeInFriendsLeaderBoard]);

  return (
    <Panel id={id}>
      {!isMobile && (
      <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home" />}>
        {APP_NAME}
      </PanelHeader>
      )}
      {isLoading ? (
        <ScreenSpinner size="large" />
      ) : (
        <MainLayout>
          <div
            className={cn(style.content_wrapper, style[platform])}
          >
            <div className={cn(style.rating_wrapper)}>
              <div className={cn(style.rating_main_info)}>
                <Text className={cn(style.rating_title)}>
                  Рейтинг
                </Text>
                <div className={cn(style.rating_numbers)}>
                  <Text className={cn(style.rating_position)}>
                    {placeInRate?.orderNumber}
                  </Text>
                  <div className={cn(style.rating_total_members)}>
                    <Text className={cn(style.rating_total_members_text)}>
                      ваше место
                    </Text>
                    <Text className={cn(style.rating_total_members_numbers)}>
                      {placeInRate?.totalUsersCount ? `из ${placeInRate?.totalUsersCount}` : 'не определено'}
                    </Text>
                  </div>
                </div>
              </div>
              <div className={cn(style.rating_list)}>
                {topPlayersList?.slice(0, 3).map(({
                  id: playerId, photo, firstName, coins,
                }) => (
                  <div key={playerId} className={cn(style.rating_list_item)}>
                    {photo ? (
                      <Avatar
                        src={photo}
                        className={cn(style.rating_avatar)}
                        size={34}
                        withBorder={false}
                      />
                    ) : null}
                    <div className={cn(style.rating_list_item_info)}>
                      <Text className={cn(style.rating_name)}>
                        {firstName}
                      </Text>
                      <div className={cn(style['rating_earned-coins'])}>
                        <MoreCoins />
                        <Text className={cn(style['rating_earned-coins_count'])}>
                          {coins}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.main_content}>
              <div className={style.main_content_header}>
                <Switcher onToggle={ratingSwitcherHandler} checked={!isAllRating} />
                <div className={cn(style['earned-coins'])}>
                  <MoreCoins />
                  <Text className={cn(style['earned-coins_count'])}>
                    {allUserCoins}
                  </Text>
                  <Text className={cn(style['earned-coins_text'])}>
                    балла/ов
                  </Text>
                </div>
              </div>
              {(isAllRating || (!isAllRating && allowed)) && (
              <GamersList
                amountCoins={allUserCoins}
                isAllRating={isAllRating}
                friendsIdList={friendsIdList}
                fetchedUser={fetchedUser}
                placeInLeaderBoard={placeInLeaderBoard}
                placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
                topPlayers={topPlayers}
                topPlayersFriends={topPlayersFriends}
              />
              )}
              {!allowed && !isAllRating && (
                <div className={style['not-allowed-to-friends-list']}>
                  <Text className={style['not-allowed-to-friends-list-description']}>
                    {'Рейтинг друзей будет открыт, когда\nты подтвердишь запрос на доступ.'}
                  </Text>
                  <MainButton
                    theme="secondary"
                    text="Доступ к друзьям"
                    onClick={() => getFriendsRatingData(fetchedUser)}
                    className={style['not-allowed-to-friends-list-button']}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={cn(style['navbar-container'], style[platform])}>
            <Navbar id={id} go={go} />
          </div>
        </MainLayout>
      )}
    </Panel>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  friendList: PropTypes.any,
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
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

export default Rating;
