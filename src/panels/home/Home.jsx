import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel,
  PanelHeader,
  Avatar,
  Text,
  ScreenSpinner,
  useAdaptivity,
  ViewWidth,
} from '@vkontakte/vkui';

import { MoreCoins } from '../../assets/image';
import Navbar from '../../shared/navbar/Navbar';
import style from './Home.module.css';
import { APP_NAME } from '../../assets/constants/constants';
import MainButton from '../../shared/mainButton/MainButton';
import Motivator from './components/Motivator';
import Timer from '../../shared/timer/Timer';

const Home = ({
  id,
  go,
  fetchedUser,
  amountCoins,
  gamesAvailable,
  isLoading,
  timeUntilNextGame,
  onEndedTimerUntilNextGame,
}) => {
  const { viewWidth } = useAdaptivity();

  console.log('viewWidth: ', viewWidth);
  console.log('ViewWidth: ', ViewWidth);

  return (
    <Panel id={id}>
      {viewWidth >= ViewWidth.TABLET && (
      <PanelHeader>{APP_NAME}</PanelHeader>
      )}
      {
        isLoading
          ? (<ScreenSpinner size="large" />)
          : (
            <div className={cn(style['home-wrapper'])}>
              <div className={cn(style.home)}>
                <div className={cn(style['home-earned'])}>
                  <Text className={cn(style['home-earned-count'])}>
                    {amountCoins}
                  </Text>
                  <MoreCoins />
                </div>
                {fetchedUser && (
                <>
                  <div className={cn(style['greetings-wrapper'])}>
                    {fetchedUser.photo_200 ? (
                      <Avatar src={fetchedUser.photo_200} className={cn(style.avatar)} size={80} />
                    ) : null}
                    <Text className={cn(style.greetings)}>
                      {`Привет, ${fetchedUser.first_name}!`}
                    </Text>
                  </div>
                  <Text className={cn(style.description)}>
                    {'Играй, зарабатывай монеты и трать\nих на покупки в СберМегаМаркете!'}
                  </Text>
                  <div className={cn(style['motivator-wrapper'])}>
                    <Motivator />
                  </div>
                </>
                )}
                <div className={cn(style['start-game-button-wrapper'])}>
                  {
                  gamesAvailable > 0
                    ? <MainButton text="Начать игру" onClick={go} goTo="gameBoard" isAnimated />
                    : (
                      <div className={cn(style['timer-until-next-game-wrapper'])}>
                        <Text className={cn(style['timer-until-next-game-text'])}>До следующей игры осталось </Text>
                        <Text className={cn(style['timer-until-next-game-time'])}>
                          <Timer time={timeUntilNextGame} onEndedTime={onEndedTimerUntilNextGame} />
                        </Text>
                      </div>
                    )
                  }
                </div>
                <div className={cn(style['navbar-container'])}>
                  <Navbar id={id} go={go} />
                </div>
              </div>
            </div>
          )
        }
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  amountCoins: PropTypes.string.isRequired,
  gamesAvailable: PropTypes.number,
  isLoading: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  onEndedTimerUntilNextGame: PropTypes.func,
};

export default Home;
