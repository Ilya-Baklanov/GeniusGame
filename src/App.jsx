import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  ModalRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';

import './global.css';
import Home from './panels/home/Home';
import Game from './panels/game/Game';
import PromoCode from './panels/promoCode/PromoCode';
import MoreCoins from './panels/moreCoins/MoreCoins';
import Rating from './panels/rating/Rating';
import usePreloadImage from './shared/hooks/usePreloadImage/usePreloadImage';
import {
  CARDS,
  MODAL_PROMO_CODE,
  MODAL_GET_PROMO_CODE,
  MOTIVATOR,
  MODAL_MORE_COINS,
  STATUS_LIST,
  POSTER_PICTURES,
} from './assets/constants/constants';
import LossPanel from './panels/lossPanel/LossPanel';
import WinPanel from './panels/winPanel/WinPanel';
import ModalPromoCode from './panels/promoCode/components/ModalPromoCode';
import useFetchUserData from './shared/hooks/useFetchUserData/useFetchUserData';
import ModalMoreCoins from './panels/moreCoins/components/ModalMoreCoins';
import Poster from './panels/poster/Poster';
import ModalGetPromoCode from './panels/promoCode/components/ModalGetPromoCode';
import { timeHandler } from './shared/timer/Timer';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [earnedCoinOnCurrentGame, setEarnedCoinOnCurrentGame] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const activateLoader = useCallback(() => { setIsLoaded(false); }, []);
  const shutdownLoader = useCallback(() => { setIsLoaded(true); }, []);

  const isPicturesLoaded = usePreloadImage([
    ...CARDS.map((card) => card.img),
    ...MOTIVATOR.map((item) => item.img),
    ...STATUS_LIST.map((status) => status.img),
    ...POSTER_PICTURES.map((posterPicture) => {
      const pictureList = [];

      if (posterPicture.img) pictureList.push(posterPicture.img);
      if (posterPicture.img_c) pictureList.push(posterPicture.img_c);
      if (posterPicture.img_w) pictureList.push(posterPicture.img_w);

      return pictureList;
    }).flat(),
  ]);

  const {
    getUserInfo,
    isFetchUserLoaded,
    fetchedUser,
    fetchedScheme,
    accessToken,
    userStat,
    refetchUserStat,
    isFetchUserStatLoaded,
    postEarnedCoins,
    isEarnedCoinsPosted,
    updateCircumstancesStatus,
    postWallPhoto,
    getServerTime,
    serverTime,
    getPromoCode,
    updateNotificationStatus,
    getFriendList,
    friendList,
    getPlaceInLeaderBoard,
    placeInLeaderBoard,
    getTopPlayers,
    topPlayers,
    getPlaceInFriendsLeaderBoard,
    placeInFriendsLeaderBoard,
    getTopPlayersFriends,
    topPlayersFriends,
  } = useFetchUserData();

  const serverTimeProcessed = useMemo(() => timeHandler(serverTime), [serverTime]);
  const resetTimeMorning = useMemo(() => timeHandler('10:00:00'), [serverTime]);
  const resetTimeEvening = useMemo(() => timeHandler('22:00:00'), [serverTime]);
  const midnightTime = useMemo(() => timeHandler('24:00:00'), [serverTime]);

  const timeUntilNextGameInSeconds = useMemo(
    () => {
      switch (true) {
        case serverTimeProcessed.hours < 10:
          return resetTimeMorning.allSeconds - serverTimeProcessed.allSeconds;
        case serverTimeProcessed.hours >= 10 && serverTimeProcessed.hours < 22:
          return resetTimeEvening.allSeconds - serverTimeProcessed.allSeconds;
        case serverTimeProcessed.hours >= 22:
          return (
            midnightTime.allSeconds - serverTimeProcessed.allSeconds
          ) + resetTimeMorning.allSeconds;
        default:
          return 0;
      }
    },
    [serverTimeProcessed, resetTimeMorning, resetTimeEvening, midnightTime],
  );

  useEffect(() => {
    if (isPicturesLoaded && isFetchUserLoaded) {
      shutdownLoader();
    } else {
      activateLoader();
    }
  }, [isPicturesLoaded]);

  const go = useCallback((e, goTo) => {
    setActivePanel(e ? e.currentTarget.dataset.to : goTo);
  }, []);

  const endGameHandler = useCallback((earnedCoin) => {
    if (earnedCoin > 0) {
      const allEarnedCoins = +earnedCoin + +userStat.coins;
      postEarnedCoins(allEarnedCoins, fetchedUser, '-1').then(() => {
        setEarnedCoinOnCurrentGame(earnedCoin);
      });
      getPlaceInLeaderBoard(fetchedUser);
      getPlaceInFriendsLeaderBoard(fetchedUser, friendList);
    }
  }, [userStat, fetchedUser, friendList]);

  const closeGameHandler = useCallback(
    () => {
      postEarnedCoins(+userStat.coins, fetchedUser, '-1');
    },
    [postEarnedCoins, fetchedUser, userStat],
  );

  const endedTimerUntilNextGame = useCallback(() => {
    refetchUserStat(fetchedUser);
  }, [fetchedUser]);

  const closeModal = () => {
    setActiveModal((prev) => ({
      ...prev,
      id: '',
    }));
  };

  const activateModalPromoCodeHandler = useCallback((denomination, promoCodeDescription) => {
    setActiveModal({
      id: MODAL_PROMO_CODE,
      content: {
        denomination,
        promoCodeDescription,
      },
    });
  }, [userStat]);

  const activateModalGetPromoCodeHandler = useCallback((promocode) => {
    refetchUserStat(fetchedUser);
    setActiveModal({
      id: MODAL_GET_PROMO_CODE,
      content: {
        promocode,
      },
    });
  }, [userStat]);

  const activateModalMoreCoinsHandler = useCallback(() => {
    setActiveModal({
      id: MODAL_MORE_COINS,
    });
  }, [userStat]);

  const modal = useMemo(() => (
    <ModalRoot
      activeModal={activeModal ? activeModal.id : null}
      onClose={closeModal}
    >
      <ModalPromoCode
        id={MODAL_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        amountCoins={userStat ? userStat.coins || '0' : '0'}
        userId={fetchedUser ? fetchedUser.id : 0}
        onClose={closeModal}
        onActiveModalGetPromocode={activateModalGetPromoCodeHandler}
        getPromoCode={getPromoCode}
      />
      <ModalGetPromoCode
        id={MODAL_GET_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        onClose={closeModal}
        user={userStat}
      />
      <ModalMoreCoins
        id={MODAL_MORE_COINS}
        activePanelId={activePanel}
        onClose={closeModal}
      />
    </ModalRoot>
  ), [activeModal, userStat]);

  const repostHandler = useCallback(() => {
    console.log('REPOST_ACTIVATE');
    postWallPhoto(fetchedUser, accessToken).then(() => {
      postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
      updateCircumstancesStatus(fetchedUser, 1).then(() => go(null, 'moreCoins'));
    });
  }, [userStat, accessToken, fetchedUser]);

  async function checkIsUserSubscribed(userId) {
    const groupSubscribed = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'groups.isMember',
      params: {
        group_id: 131445697,
        user_id: userId,
        extended: '0',
        v: '5.131',
        access_token: accessToken,
      },
    });
    return groupSubscribed.response;
  }

  const joinGroupHandler = useCallback(async () => {
    async function joinGroup() {
      bridge.send('VKWebAppJoinGroup', {
        group_id: 131445697,
      })
        .then((data) => {
          if (data.result) {
            postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
            updateCircumstancesStatus(fetchedUser, 0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const isSub = await checkIsUserSubscribed(fetchedUser.id);
    if (isSub) {
      // eslint-disable-next-line no-alert
      alert('Вы уже подписаны');
      postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
      updateCircumstancesStatus(fetchedUser, 0);
    } else {
      joinGroup();
    }
  }, [userStat, accessToken]);

  const goToPosterPage = useCallback(() => {
    console.log('GO TO POSTER_PAGE');
    go(null, 'poster');
  }, []);

  const setStatusHandler = useCallback(() => {
    console.log('STATUS');
    activateModalMoreCoinsHandler();
  }, []);

  async function sendInvites(token, userId) {
    const groupSubscribed = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'apps.sendRequest',
      params: {
        user_id: userId,
        text: 'GO V DOTY YA SOZDAL',
        type: 'invite',
        v: '5.131',
        access_token: token,
      },
    });
    return groupSubscribed.response;
  }

  const inviteFriendsHandler = useCallback(async () => {
    console.log('VKWebAppShowInviteBox');
    await bridge.send('VKWebAppShowInviteBox', {})
      .then((data) => console.log(data.success))
      .catch((error) => console.log(error));
  }, []);

  const subscribeToBotHandler = useCallback(() => {
    console.log('SUBSCRIBE');
  }, []);

  const moreCoinsCardClickHandler = useCallback((cardId) => {
    switch (cardId) {
      case 'JOIN_GROUP':
        return joinGroupHandler();
      case 'REPOST':
        return goToPosterPage();
      case 'STATUS':
        return setStatusHandler();
      case 'INVITE_FRIENDS':
        return inviteFriendsHandler();
      case 'SUBSCRIBE_TO_BOT':
        return subscribeToBotHandler();
      default:
        return console.log('Invalid CardId');
    }
  }, [joinGroupHandler]);

  return (
    <ConfigProvider scheme={fetchedScheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal}>
            <SplitCol animate>

              {isLoaded && userStat ? (
                <View activePanel={activePanel}>
                  <Home
                    id="home"
                    fetchedUser={fetchedUser}
                    go={go}
                    amountCoins={userStat.coins || '0'}
                    isLoading={!isFetchUserStatLoaded}
                    gamesAvailable={+userStat.gameCount}
                    timeUntilNextGame={timeUntilNextGameInSeconds}
                    onEndedTimerUntilNextGame={endedTimerUntilNextGame}
                  />
                  <Game
                    id="gameBoard"
                    go={go}
                    onEndGame={endGameHandler}
                    onCloseGame={closeGameHandler}
                  />
                  <PromoCode
                    id="promoCode"
                    go={go}
                    amountCoins={userStat.coins || '0'}
                    onActivateModal={activateModalPromoCodeHandler}
                    isLoading={!isFetchUserStatLoaded}
                  />
                  <MoreCoins
                    id="moreCoins"
                    go={go}
                    amountCoins={userStat.coins || '0'}
                    circumstances={userStat.circumstances}
                    notificationStatus={userStat.notifications}
                    onClickToCard={moreCoinsCardClickHandler}
                    fetchedUser={fetchedUser}
                    isLoading={!isFetchUserStatLoaded}
                    onUpdateNotificationStatus={updateNotificationStatus}
                  />
                  <Rating
                    id="rating"
                    go={go}
                    amountCoins={userStat.coins || '0'}
                    accessToken={accessToken}
                    isLoading={!isFetchUserStatLoaded}
                    friendList={friendList}
                    fetchedUser={fetchedUser}
                    placeInLeaderBoard={placeInLeaderBoard}
                    placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
                    getUserInfo={getUserInfo}
                    getTopPlayers={getTopPlayers}
                    getTopPlayersFriends={getTopPlayersFriends}
                  />
                  <LossPanel
                    id="lossGame"
                    go={go}
                    isMoreGamesAvailable={userStat.gameCount > 0}
                    timeUntilNextGame={timeUntilNextGameInSeconds}
                  />
                  <WinPanel
                    id="winGame"
                    go={go}
                    earnedCoin={earnedCoinOnCurrentGame}
                    isLoading={!isEarnedCoinsPosted}
                    isMoreGamesAvailable={userStat.gameCount > 0}
                    timeUntilNextGame={timeUntilNextGameInSeconds}
                  />
                  <Poster id="poster" go={go} onRepost={repostHandler} />
                </View>
              ) : (
                <ScreenSpinner size="large" />
              )}

            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
