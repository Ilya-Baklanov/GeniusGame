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
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  ModalRoot,
  ModalCard,
  Button,
  usePlatform,
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
  MODAL_MORE_COINS_STATUS,
  MODAL_MORE_COINS_INVITE_FRIENDS,
  STATUS_LIST,
  POSTER_PICTURES,
  ALERT,
  COMMON_PICTURES,
  DAILY_CHALLENGE_PICTURES,
  MODAL_EXIT_CONFIRM,
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
import LoadingPage from './shared/LoadingPage/LoadingPage';
import DailyChallenge from './panels/dailyChallenge/DailyChallenge';
import ModalExitConfirm from './panels/moreCoins/components/ModalExitConfirm';

const { body } = document;
const isMobile = body.offsetWidth <= 480;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [earnedCoinOnCurrentGame, setEarnedCoinOnCurrentGame] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const platform = usePlatform();
  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();

  console.log('PLATFORM>>>_____: ', platform);

  const activateLoader = () => setIsLoaded(false);
  const shutdownLoader = () => setIsLoaded(true);

  const { isPicturesLoaded, downloadPercentage } = usePreloadImage([
    ...CARDS.map((card) => card.img),
    ...STATUS_LIST.map((status) => status.img),
    ...POSTER_PICTURES.map((posterPicture) => {
      const pictureList = [];

      if (posterPicture.img) pictureList.push(posterPicture.img);
      if (posterPicture.img_c) pictureList.push(posterPicture.img_c);
      if (posterPicture.img_w) pictureList.push(posterPicture.img_w);

      return pictureList;
    }).flat(),
    ...COMMON_PICTURES.map((item) => item.img),
    ...DAILY_CHALLENGE_PICTURES.map((item) => item.img),
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
    promocodesList,
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

  const dailyChallengeCount = userStat?.dailyChallengeCount >= 0
    ? Number(userStat?.dailyChallengeCount) + 1
    : 0;

  console.log('dailyChallengeCount: ', userStat?.dailyChallengeCount && userStat?.dailyChallengeCount >= 0);

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
          go(null, PanelTypes.gameBoard);
        } else {
          go(null, PanelTypes.home);
        }
      });
  }, [refetchUserStat, fetchedUser]);

  // const endedAdvanceСountdownTimeHandler = useCallback(
  //   () => {
  //     if (userStat && fetchedUser) {
  //       postEarnedCoins(+userStat.coins, fetchedUser, '-1', null);
  //     }
  //   },
  //   [postEarnedCoins, fetchedUser, userStat],
  // );

  const endGameHandler = useCallback((earnedCoin) => {
    if (earnedCoin >= 0 && userStat && fetchedUser) {
      const allEarnedCoins = +earnedCoin + +userStat.coins;
      postEarnedCoins(allEarnedCoins, fetchedUser, '-1', null).then(() => {
        setEarnedCoinOnCurrentGame(earnedCoin);
      });
    }
  }, [userStat, fetchedUser]);

  const endedTimerUntilNextGame = useCallback(() => setTimeout(() => {
    refetchUserStat(fetchedUser);
  }, 1500), [fetchedUser, refetchUserStat]);

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
      postEarnedCoins(+userStat.coins + 10, fetchedUser, '0', 2);
      updateCircumstancesStatus(fetchedUser, 2);
    }
  }, [setStatus, userStat, fetchedUser]);

  const activateModalMoreCoinsInviteFriendsHandler = useCallback(() => {
    setActiveModal({
      id: MODAL_MORE_COINS_INVITE_FRIENDS,
    });
  }, []);

  const activateModalExitConfirmHandler = useCallback(() => {
    setActiveModal({
      id: MODAL_EXIT_CONFIRM,
    });
  }, []);

  const activateAlert = useCallback(() => {
    setActiveModal({
      id: ALERT,
    });
  }, []);

  const confirmExitGameHandler = useCallback(
    async () => {
      if (userStat && fetchedUser) {
        await postEarnedCoins(+userStat.coins, fetchedUser, '-1', null);
        go(null, 'home');
        closeModal();
      }
    },
    [postEarnedCoins, fetchedUser, userStat],
  );

  const modal = useMemo(() => (
    <ModalRoot
      activeModal={activeModal ? activeModal.id : null}
      onClose={closeModal}
    >
      <ModalPromoCode
        id={MODAL_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        amountCoins={userStat ? (userStat.coins || '0') : '0'}
        fetchedUser={fetchedUser}
        onClose={closeModal}
        onActiveModalGetPromocode={activateModalGetPromoCodeHandler}
        getPromoCode={getPromoCode}
        getUserPromoCodes={getUserPromoCodes}
        platform={platform}
      />
      <ModalGetPromoCode
        id={MODAL_GET_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        onClose={closeModal}
        user={userStat}
        platform={platform}
      />
      <ModalMoreCoinsStatus
        id={MODAL_MORE_COINS_STATUS}
        activePanelId={activePanel}
        content={activeModal ? activeModal.content : null}
        onClose={closeModal}
        onSelect={changeStatusHandler}
        platform={platform}
      />
      <ModalMoreCoinsInviteFriends
        id={MODAL_MORE_COINS_INVITE_FRIENDS}
        activePanelId={activePanel}
        onClose={closeModal}
        platform={platform}
      />
      <ModalExitConfirm
        id={MODAL_EXIT_CONFIRM}
        onConfirm={confirmExitGameHandler}
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

  const closeGameHandler = useCallback(
    () => {
      activateModalExitConfirmHandler();
    },
    [],
  );

  const repostHandler = useCallback(async () => {
    const storiesToken = await fetchStoriesToken(fetchedUser);
    if (userStat && storiesToken && fetchedUser && storiesToken) {
      postStoriesPhoto(fetchedUser, storiesToken).then(() => {
        postEarnedCoins(+userStat.coins + 10, fetchedUser, '0', 1);
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
                postEarnedCoins(+userStat.coins + 10, fetchedUser, '0', 0);
                updateCircumstancesStatus(fetchedUser, 0);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const isSub = await checkIsUserSubscribed(fetchedUser.id, groupToken);
        if (isSub) {
        // eslint-disable-next-line no-alert
          activateAlert();
          postEarnedCoins(+userStat.coins + 10, fetchedUser, '0', 0);
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
  }, [
    joinGroupHandler,
    goToPosterPage,
    setStatusHandler,
    inviteFriendsHandler,
    subscribeToBotHandler,
  ]);

  return (
    <ConfigProvider appearance={fetchedScheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal}>
            <SplitCol animate>
              {isLoaded && userStat ? (
              // {isLoaded ? (
                <Epic activeStory={activeView}>
                  <View id="main" activePanel={activePanel}>
                    <Home
                      id={PanelTypes.home}
                      fetchedUser={fetchedUser}
                      go={go}
                      onStartGame={() => go(null, PanelTypes.dailyChallenge)}
                      amountCoins={userStat?.coins || '0'}
                      isLoading={!isFetchUserStatLoaded}
                      gamesAvailable={Number(userStat?.gameCount ?? '0')}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      onEndedTimerUntilNextGame={endedTimerUntilNextGame}
                      isMobile={isMobile}
                      platform={platform}
                      placeInLeaderBoard={placeInLeaderBoard}
                      topPlayers={topPlayers}
                      promocodesList={promocodesList}
                    />
                    <Game
                      gamesAvailable={Number(userStat?.gameCount ?? '0')}
                      id={PanelTypes.gameBoard}
                      go={go}
                      // onEndedAdvanceСountdownTime={endedAdvanceСountdownTimeHandler}
                      onEndGame={endGameHandler}
                      onCloseGame={closeGameHandler}
                      isMobile={isMobile}
                    />
                    <PromoCode
                      id={PanelTypes.promoCode}
                      go={go}
                      amountCoins={userStat?.coins || '0'}
                      onActivateModal={activateModalPromoCodeHandler}
                      isLoading={!isFetchUserStatLoaded}
                      isMobile={isMobile}
                    />
                    <MyPromoCode
                      id={PanelTypes.myPromoCode}
                      go={go}
                      amountCoins={userStat?.coins || '0'}
                      isLoading={!isFetchUserStatLoaded}
                      isMobile={isMobile}
                      promocodesList={promocodesList}
                    />
                    <MoreCoins
                      id={PanelTypes.moreCoins}
                      go={go}
                      amountCoins={userStat?.coins || '0'}
                      circumstances={userStat?.circumstances || ''}
                      notificationStatus={userStat?.notifications || ''}
                      onClickToCard={moreCoinsCardClickHandler}
                      fetchedUser={fetchedUser}
                      isLoading={!isFetchUserStatLoaded}
                      onUpdateNotificationStatus={updateNotificationStatus}
                      isMobile={isMobile}
                    />
                    <Rating
                      id={PanelTypes.rating}
                      go={go}
                      amountCoins={userStat?.coins || '0'}
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
                      topPlayers={topPlayers}
                      topPlayersFriends={topPlayersFriends}
                    />
                    <LossPanel
                      id={PanelTypes.lossGame}
                      go={go}
                      isLoading={!isEarnedCoinsPosted}
                      isMoreGamesAvailable={Number(userStat?.gameCount ?? '0') > 0}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      isMobile={isMobile}
                    />
                    <WinPanel
                      id={PanelTypes.winGame}
                      go={go}
                      earnedCoin={earnedCoinOnCurrentGame}
                      isLoading={!isEarnedCoinsPosted}
                      isMoreGamesAvailable={Number(userStat?.gameCount ?? '0') > 0}
                      timeUntilNextGame={timeUntilNextGameInSeconds}
                      isMobile={isMobile}
                    />
                    <Poster
                      id={PanelTypes.poster}
                      go={go}
                      onRepost={repostHandler}
                      isMobile={isMobile}
                    />
                    <DailyChallenge
                      id={PanelTypes.dailyChallenge}
                      go={go}
                      isLoading={!isFetchUserStatLoaded}
                      isMobile={isMobile}
                      dailyChallengeCount={dailyChallengeCount}
                      onStartGame={startGameHandler}
                      platform={platform}
                    />
                  </View>
                </Epic>
              ) : (
                <LoadingPage downloadPercentage={downloadPercentage} platform={platform} />
              )}
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
