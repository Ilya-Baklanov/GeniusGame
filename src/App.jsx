import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useRouterSelector, useRouterActions } from 'react-router-vkminiapps';

import {
  Epic,
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  ModalRoot,
  ModalCard,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';

import './global.css';
import { PanelTypes } from './structure';
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
  MODAL_MORE_COINS_STATUS,
  MODAL_MORE_COINS_INVITE_FRIENDS,
  STATUS_LIST,
  POSTER_PICTURES,
  ALERT,
} from './assets/constants/constants';
import LossPanel from './panels/lossPanel/LossPanel';
import WinPanel from './panels/winPanel/WinPanel';
import ModalPromoCode from './panels/promoCode/components/ModalPromoCode';
import useFetchUserData from './shared/hooks/useFetchUserData/useFetchUserData';
import ModalMoreCoinsStatus from './panels/moreCoins/components/ModalMoreCoinsStatus';
import Poster from './panels/poster/Poster';
import ModalGetPromoCode from './panels/promoCode/components/ModalGetPromoCode';
import { timeHandler } from './shared/timer/Timer';
import ModalMoreCoinsInviteFriends from './panels/moreCoins/components/ModalMoreCoinsInviteFriends';
import MyPromoCode from './panels/myPromocodes/MyPromoCode';

const { body } = document;
const isMobile = body.offsetWidth <= 480;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [earnedCoinOnCurrentGame, setEarnedCoinOnCurrentGame] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();

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
    userStat,
    refetchUserStat,
    isFetchUserStatLoaded,
    postEarnedCoins,
    isEarnedCoinsPosted,
    updateCircumstancesStatus,
    postStoriesPhoto,
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
    fetchFriendsToken,
    fetchStoriesToken,
    fetchGroupsToken,
    getAllowed,
    fetchStatusToken,
    getUserPromoCodes,
    setStatus,
    getStatus,
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
  }, [isPicturesLoaded, isFetchUserLoaded]);

  const go = useCallback((e, goTo) => {
    getServerTime();
    toPanel(e ? e.currentTarget.dataset.to : goTo);
  }, []);

  const startGameHandler = useCallback(() => {
    refetchUserStat(fetchedUser)
      .then((response) => {
        if (+response.gameCount > 0) {
          go(null, 'gameBoard');
        }
      });
  }, [refetchUserStat, fetchedUser]);

  const endGameHandler = useCallback((earnedCoin) => {
    if (earnedCoin > 0 && userStat && fetchedUser) {
      const allEarnedCoins = +earnedCoin + +userStat.coins;
      postEarnedCoins(allEarnedCoins, fetchedUser, '-1').then(() => {
        setEarnedCoinOnCurrentGame(earnedCoin);
        console.log('EndgameHandler 2');
      });
    }
  }, [userStat, fetchedUser]);

  const closeGameHandler = useCallback(
    () => {
      if (userStat && fetchedUser) {
        postEarnedCoins(+userStat.coins, fetchedUser, '-1');
      }
    },
    [postEarnedCoins, fetchedUser, userStat],
  );

  const endedTimerUntilNextGame = useCallback(() => {
    setTimeout(() => {
      refetchUserStat(fetchedUser);
    }, 1500);
  }, [fetchedUser, refetchUserStat]);

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
  }, []);

  const activateModalGetPromoCodeHandler = useCallback((promocode) => {
    if (fetchedUser) {
      refetchUserStat(fetchedUser);
      setActiveModal({
        id: MODAL_GET_PROMO_CODE,
        content: {
          promocode,
        },
      });
    }
  }, [refetchUserStat, fetchedUser]);

  const activateModalMoreCoinsStatusHandler = useCallback((statusId) => {
    setActiveModal({
      id: MODAL_MORE_COINS_STATUS,
      content: {
        statusId: `${statusId}`,
      },
    });
  }, []);

  const changeStatusHandler = useCallback(async (statusId) => {
    const { response } = await setStatus(statusId);

    if (response?.response) {
      setActiveModal((prev) => ({
        ...prev,
        content: {
          statusId: `${statusId}`,
        },
      }));
    }

    if (response?.response && userStat.circumstances[2] === '0') {
      postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
      updateCircumstancesStatus(fetchedUser, 2);
    }
  }, [setStatus, userStat, fetchedUser]);

  const activateModalMoreCoinsInviteFriendsHandler = useCallback(() => {
    setActiveModal({
      id: MODAL_MORE_COINS_INVITE_FRIENDS,
    });
  }, []);

  const activateAlert = useCallback(() => {
    setActiveModal({
      id: ALERT,
    });
  }, []);

  const modal = useMemo(() => (
    <ModalRoot
      activeModal={activeModal ? activeModal.id : null}
      onClose={closeModal}
    >
      <ModalPromoCode
        id={MODAL_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        amountCoins={userStat ? (userStat.coins || '0') : '0'}
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
      <ModalMoreCoinsStatus
        id={MODAL_MORE_COINS_STATUS}
        activePanelId={activePanel}
        content={activeModal ? activeModal.content : null}
        onClose={closeModal}
        onSelect={changeStatusHandler}
      />
      <ModalMoreCoinsInviteFriends
        id={MODAL_MORE_COINS_INVITE_FRIENDS}
        activePanelId={activePanel}
        onClose={closeModal}
      />

      <ModalCard
        id={ALERT}
        onClose={closeModal}
        header="Вы уже подписаны :)"
        subheader="Монеты будут начислены. Играй, и продолжай копить чтобы получить промокод!"
        actions={(
          <Button
            size="l"
            mode="primary"
            onClick={closeModal}
          >
            Отлично!
          </Button>
              )}
      />
    </ModalRoot>
  ), [activeModal, userStat]);

  const repostHandler = useCallback(async () => {
    const storiesToken = await fetchStoriesToken(fetchedUser);
    if (userStat && storiesToken && fetchedUser && storiesToken) {
      postStoriesPhoto(fetchedUser, storiesToken).then(() => {
        postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
        updateCircumstancesStatus(fetchedUser, 1).then(() => go(null, 'moreCoins'));
      });
    }
  }, [userStat, fetchedUser, fetchStoriesToken]);

  async function checkIsUserSubscribed(userId, token) {
    const groupSubscribed = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'groups.isMember',
      params: {
        group_id: 131445697,
        user_id: userId,
        extended: '0',
        v: '5.131',
        access_token: token,
      },
    });
    return groupSubscribed.response;
  }

  const joinGroupHandler = useCallback(async () => {
    if (userStat && fetchedUser) {
      const groupToken = await fetchGroupsToken(fetchedUser);

      if (groupToken) {
        // eslint-disable-next-line no-inner-declarations
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

        const isSub = await checkIsUserSubscribed(fetchedUser.id, groupToken);
        if (isSub) {
          activateAlert();
          postEarnedCoins(+userStat.coins + 10, fetchedUser, '0');
          updateCircumstancesStatus(fetchedUser, 0);
        } else {
          joinGroup();
        }
      }
    }
  }, [userStat, fetchedUser, fetchGroupsToken]);

  const goToPosterPage = useCallback(() => {
    go(null, 'poster');
  }, []);

  const setStatusHandler = useCallback(async () => {
    const { statusToken, response } = await getStatus();
    if (statusToken) {
      activateModalMoreCoinsStatusHandler(response?.response?.status?.id || '');
    }
  }, [getStatus]);

  const inviteFriendsHandler = useCallback(async () => {
    activateModalMoreCoinsInviteFriendsHandler();
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
                <Epic activeStory={activeView}>
                  <View id="main" activePanel={activePanel}>
                    <Home
                      id={PanelTypes.home}
                      fetchedUser={fetchedUser}
                      go={go}
                      onStartGame={startGameHandler}
                      amountCoins={userStat.coins || '0'}
                      isLoading={!isFetchUserStatLoaded}
                      gamesAvailable={+userStat.gameCount || 0}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      onEndedTimerUntilNextGame={endedTimerUntilNextGame}
                      isMobile={isMobile}
                    />
                    <Game
                      id={PanelTypes.gameBoard}
                      go={go}
                      onEndGame={endGameHandler}
                      onCloseGame={closeGameHandler}
                      isMobile={isMobile}
                    />
                    <PromoCode
                      id={PanelTypes.promoCode}
                      go={go}
                      amountCoins={userStat.coins || '0'}
                      onActivateModal={activateModalPromoCodeHandler}
                      isLoading={!isFetchUserStatLoaded}
                      isMobile={isMobile}
                    />
                    <MyPromoCode
                      id={PanelTypes.myPromoCode}
                      go={go}
                      amountCoins={userStat.coins || '0'}
                      isLoading={!isFetchUserStatLoaded}
                      isMobile={isMobile}
                      fetchedUser={fetchedUser}
                      getUserPromoCodes={getUserPromoCodes}
                    />
                    <MoreCoins
                      id={PanelTypes.moreCoins}
                      go={go}
                      amountCoins={userStat.coins || '0'}
                      circumstances={userStat.circumstances || ''}
                      notificationStatus={userStat.notifications || ''}
                      onClickToCard={moreCoinsCardClickHandler}
                      fetchedUser={fetchedUser}
                      isLoading={!isFetchUserStatLoaded}
                      onUpdateNotificationStatus={updateNotificationStatus}
                      isMobile={isMobile}
                    />
                    <Rating
                      id={PanelTypes.rating}
                      go={go}
                      amountCoins={userStat.coins || '0'}
                      isLoading={!isFetchUserStatLoaded}
                      friendList={friendList}
                      fetchedUser={fetchedUser}
                      getPlaceInLeaderBoard={getPlaceInLeaderBoard}
                      getPlaceInFriendsLeaderBoard={getPlaceInFriendsLeaderBoard}
                      placeInLeaderBoard={placeInLeaderBoard}
                      placeInFriendsLeaderBoard={placeInFriendsLeaderBoard}
                      getTopPlayers={getTopPlayers}
                      getTopPlayersFriends={getTopPlayersFriends}
                      isMobile={isMobile}
                      getFriendList={getFriendList}
                      fetchFriendsToken={fetchFriendsToken}
                      getAllowed={getAllowed}
                    />
                    <LossPanel
                      id={PanelTypes.lossGame}
                      go={go}
                      isMoreGamesAvailable={+userStat.gameCount > 0}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      isMobile={isMobile}
                    />
                    <WinPanel
                      id={PanelTypes.winGame}
                      go={go}
                      earnedCoin={earnedCoinOnCurrentGame}
                      isLoading={!isEarnedCoinsPosted}
                      isMoreGamesAvailable={+userStat.gameCount > 0}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      isMobile={isMobile}
                    />
                    <Poster
                      id={PanelTypes.poster}
                      go={go}
                      onRepost={repostHandler}
                      isMobile={isMobile}
                    />
                  </View>
                </Epic>
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
