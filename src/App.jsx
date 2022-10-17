import React, { useState, useEffect, useCallback } from 'react';
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
  const [earnedCoinOnCurrentGame, seteErnedCoinOnCurrentGame] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const activateLoader = useCallback(() => { setIsLoaded(false); }, []);
  const shutdownLoader = useCallback(() => { setIsLoaded(true); }, []);

  const isPicturesLoaded = usePreloadImage([
    ...CARDS.map((card) => card.img),
    ...MOTIVATOR.map((item) => item.img),
  ]);

  const {
    isFetchUserLoaded, fetchedUser, fetchedScheme, accessToken, amountCoins,
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

  const endGameHandler = useCallback((earnedCoin, userId, amountCoin) => {
    const keyValue = `${userId}_geniusGame`;
    console.log('Before', Number(earnedCoin) + Number(amountCoin));
    const result = bridge.send(
      'VKWebAppStorageSet',
      {
        key: keyValue,
        value: String(Number(earnedCoin) + Number(amountCoin)),
      },
    );
    console.log('After game', result);
    seteErnedCoinOnCurrentGame(Number(earnedCoin) + Number(amountCoin));
  }, []);

  const closeModal = () => {
    setActiveModal(null);
  };

  const modal = (
    <ModalRoot
      activeModal={activeModal}
      onClose={closeModal}
    >
      <ModalPromoCode id={MODAL_PROMO_CODE} onClose={closeModal} />
    </ModalRoot>
  );

  const activateModalPromoCodeHandler = useCallback(() => {
    setActiveModal(MODAL_PROMO_CODE);
  }, []);

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
                  <MoreCoins id="moreCoins" go={go} amountCoins={amountCoins} />
                  <Rating id="rating" go={go} amountCoins={amountCoins} accessToken={accessToken} />
                  <LossPanel id="lossGame" go={go} />
                  <WinPanel id="winGame" go={go} earnedCoin={earnedCoinOnCurrentGame} amountCoins={amountCoins} />
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
