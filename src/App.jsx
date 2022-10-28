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

import './global.css';
import './App.css';

import bridge from '@vkontakte/vk-bridge';
import Home from './panels/home/Home';
import Game from './panels/game/Game';
import PromoCode from './panels/promoCode/PromoCode';
import MoreCoins from './panels/moreCoins/MoreCoins';
import Rating from './panels/rating/Rating';
import usePreloadImage from './shared/hooks/usePreloadImage/usePreloadImage';
import { CARDS, MODAL_PROMO_CODE, MOTIVATOR } from './assets/constants/constants';
import LossPanel from './panels/lossPanel/LossPanel';
import WinPanel from './panels/winPanel/WinPanel';
import ModalPromoCode from './panels/promoCode/components/ModalPromoCode';
import useFetchUserData from './shared/hooks/useFetchUserData/useFetchUserData';

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
  ]);

  const {
    isFetchUserLoaded,
    fetchedUser,
    fetchedScheme,
    accessToken,
    amountCoins,
    refetchUserCoins,
    postEarnedCoins,
    isEarnedCoinsPosted,
    notificationsState,
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

  const endGameHandler = useCallback((earnedCoin, userId) => {
    const allEarnedCoins = +earnedCoin + +amountCoins;
    postEarnedCoins(allEarnedCoins, fetchedUser).then(() => {
      refetchUserCoins(fetchedUser);
      setEarnedCoinOnCurrentGame(earnedCoin);
    });
  }, [amountCoins, fetchedUser]);

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
        amountCoins={amountCoins}
        onClose={closeModal}
      />
    </ModalRoot>
  ), [activeModal, amountCoins]);

  const activateModalPromoCodeHandler = useCallback((denomination, promoCodeDescription) => {
    setActiveModal({
      id: MODAL_PROMO_CODE,
      content: {
        denomination,
        promoCodeDescription,
      },
      amountCoins,
    });
  }, [amountCoins]);

  async function updateCircumstancesStatus(user) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'localhost:8080',
      },
      dataType: 'json',
      body: JSON.stringify({
        userId: user.id,
        circumstance: 0, // Индекс задания, начиная с 0,
        // сверху вниз(0-группа, 1-репост баннера и т.д.)
      }),
    };
    const response = await fetch('http://localhost:8080/v1/api/updateCirc', requestOptions);
    console.log(response.json());
  }

  const joinGroupHandler = useCallback(() => {
    async function getFriendList() {
      const groupSubscribed = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'groups.isMember',
        params: {
          group_id: 'habr',
          user_id: '105560317',
          extended: '0',
          v: '5.131',
          access_token: accessToken,
        },
      });
      console.log('SUBCRIBED? ', groupSubscribed.response);
    }
    getFriendList().then(() => postEarnedCoins(+amountCoins + 10, fetchedUser))
      .then(() => updateCircumstancesStatus(fetchedUser));
  }, [amountCoins, accessToken]);

  const repostHandler = useCallback(() => {
    async function postWallPhoto() {
      const wallPostResult = await bridge.send('VKWebAppShowWallPostBox', {
        owner_id: fetchedUser.id,
        message: 'Привет!',
        // eslint-disable-next-line no-useless-concat
        attachments: `photo_${fetchedUser.id},` + 'https://sun9-40.userapi.com/impg/jBHJhobGUnuodlbDJOt5WLwGfgyyouFEUCxXHA/v4Z2MEW_0xE.jpg?size=1189x862&quality=96&sign=e02e7521f5996a2124b977d31e00f0b6&type=album',
        v: '5.131',
        access_token: accessToken,
      });
      console.log('Result of post photo ', wallPostResult.response);
    }
    postWallPhoto().then(() => postEarnedCoins(+amountCoins + 10, fetchedUser));
    console.log('postwall');
  }, [amountCoins, accessToken]);

  const setStatusHandler = useCallback(() => {
    console.log('STATUS');
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
        return repostHandler();
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
            <SplitCol>

              {isLoaded ? (
                <View activePanel={activePanel}>
                  <Home id="home" fetchedUser={fetchedUser} go={go} amountCoins={amountCoins} />
                  <Game id="gameBoard" go={go} amountCoins={amountCoins} onEndGame={endGameHandler} userId={fetchedUser.id} />
                  <PromoCode id="promoCode" go={go} amountCoins={amountCoins} onActivateModal={activateModalPromoCodeHandler} />
                  <MoreCoins id="moreCoins" go={go} amountCoins={amountCoins} onClickToCard={moreCoinsCardClickHandler} fetchedUser={fetchedUser} notificationsState={notificationsState} />
                  <Rating id="rating" go={go} amountCoins={amountCoins} accessToken={accessToken} />
                  <LossPanel id="lossGame" go={go} />
                  <WinPanel id="winGame" go={go} earnedCoin={earnedCoinOnCurrentGame} isLoading={!isEarnedCoinsPosted} />
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
