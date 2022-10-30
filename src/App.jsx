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
  CARDS, MODAL_PROMO_CODE, MOTIVATOR, MODAL_MORE_COINS, STATUS_LIST, POSTER_PICTURES,
} from './assets/constants/constants';
import LossPanel from './panels/lossPanel/LossPanel';
import WinPanel from './panels/winPanel/WinPanel';
import ModalPromoCode from './panels/promoCode/components/ModalPromoCode';
import useFetchUserData from './shared/hooks/useFetchUserData/useFetchUserData';
import ModalMoreCoins from './panels/moreCoins/components/ModalMoreCoins';
import Poster from './panels/poster/Poster';

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
    isFetchUserLoaded,
    fetchedUser,
    fetchedScheme,
    accessToken,
    userStat,
    postEarnedCoins,
    isEarnedCoinsPosted,
    updateCircumstancesStatus,
    postWallPhoto,
  } = useFetchUserData();

  useEffect(() => {
    if (isPicturesLoaded && isFetchUserLoaded) {
      shutdownLoader();
    } else {
      activateLoader();
    }
  }, [isPicturesLoaded]);

  const go = (e, goTo) => {
    setActivePanel(e ? e.currentTarget.dataset.to : goTo);
  };

  const endGameHandler = useCallback((earnedCoin) => {
    const allEarnedCoins = +earnedCoin + +userStat.coins;
    postEarnedCoins(allEarnedCoins, fetchedUser).then(() => {
      setEarnedCoinOnCurrentGame(earnedCoin);
    });
  }, [userStat, fetchedUser]);

  const closeModal = () => {
    setActiveModal((prev) => ({
      ...prev,
      id: '',
    }));
  };

  const modal = useMemo(() => (
    <ModalRoot
      activeModal={activeModal ? activeModal.id : null}
      onClose={closeModal}
    >
      <ModalPromoCode
        id={MODAL_PROMO_CODE}
        content={activeModal ? activeModal.content : null}
        amountCoins={userStat ? userStat.coins : '0'}
        onClose={closeModal}
      />
      <ModalMoreCoins
        id={MODAL_MORE_COINS}
        activePanelId={activePanel}
        onClose={closeModal}
      />
    </ModalRoot>
  ), [activeModal, userStat]);

  const activateModalPromoCodeHandler = useCallback((denomination, promoCodeDescription) => {
    setActiveModal({
      id: MODAL_PROMO_CODE,
      content: {
        denomination,
        promoCodeDescription,
      },
      // userStat,
    });
  }, [userStat]);

  const activateModalMoreCoinsHandler = useCallback(() => {
    setActiveModal({
      id: MODAL_MORE_COINS,
    });
  }, [userStat]);

  const repostHandler = useCallback(() => {
    console.log('REPOST_ACTIVATE');
    postWallPhoto(fetchedUser, 'Привет!', accessToken).then(() => {
      postEarnedCoins(+userStat.coins + 10, fetchedUser);
      updateCircumstancesStatus(fetchedUser, 1).then(() => go(null, 'moreCoins'));
    });
  }, [userStat, accessToken, fetchedUser]);

  const joinGroupHandler = useCallback(() => {
    async function joinGroup() {
      bridge.send('VKWebAppJoinGroup', {
        group_id: 138201238,
      })
        .then((data) => {
          if (data.result) {
            console.log('SUBCRIBED? ', 1);
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });

      // const groupSubscribed = await bridge.send('VKWebAppCallAPIMethod', {
      //   method: 'groups.isMember',
      //   params: {
      //     group_id: 'habr',
      //     user_id: '105560317',
      //     extended: '0',
      //     v: '5.131',
      //     access_token: accessToken,
      //   },
      // });
      // console.log('SUBCRIBED? ', groupSubscribed.response);
    }
    joinGroup().then(() => postEarnedCoins(+userStat.coins + 10, fetchedUser))
      .then(() => updateCircumstancesStatus(fetchedUser));
  }, [userStat, accessToken]);

  const goToPosterPage = useCallback(() => {
    console.log('GO TO POSTER_PAGE');
    go(null, 'poster');
  }, []);

  const setStatusHandler = useCallback(() => {
    console.log('STATUS');
    activateModalMoreCoinsHandler();
  }, []);

  const inviteFriendsHandler = useCallback(() => {
    console.log('INVITE');
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

              {isLoaded ? (
                <View activePanel={activePanel}>
                  <Home id="home" fetchedUser={fetchedUser} go={go} amountCoins={userStat.coins} />
                  <Game id="gameBoard" go={go} amountCoins={userStat.coins} onEndGame={endGameHandler} userId={fetchedUser.id} />
                  <PromoCode id="promoCode" go={go} amountCoins={userStat.coins} onActivateModal={activateModalPromoCodeHandler} />
                  <MoreCoins
                    id="moreCoins"
                    go={go}
                    userStat={userStat}
                    onClickToCard={moreCoinsCardClickHandler}
                    fetchedUser={fetchedUser}
                  />
                  <Rating id="rating" go={go} amountCoins={userStat.coins} accessToken={accessToken} />
                  <LossPanel id="lossGame" go={go} />
                  <WinPanel id="winGame" go={go} earnedCoin={earnedCoinOnCurrentGame} isLoading={!isEarnedCoinsPosted} />
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
