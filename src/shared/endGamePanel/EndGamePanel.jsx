import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton, ScreenSpinner,
} from '@vkontakte/vkui';

import { MoreCoins, Close } from '../../assets/image';
import style from './EndGamePanel.module.css';
import { APP_NAME } from '../../assets/constants/constants';
import MainLayout from '../mainLayout/MainLayout';
import MainButton from '../mainButton/MainButton';

const EndGamePanel = ({
  id, go, isMoreGamesAvailable, lose, win, timeUntilNextGame, isLoading, earnedCoin,
}) => (
  <Panel id={id}>
    <PanelHeader
      left={<PanelHeaderBack onClick={go} data-to="home" />}
    >
      {APP_NAME}
    </PanelHeader>

    <MainLayout>
      <div className={cn(style['end-game-header'])}>
        <div className={cn(style['end-game-close-button-wrapper'])}>
          <IconButton
            onClick={go}
            data-to="home"
            className={cn(style['end-game-close-button'])}
          >
            <Close />
          </IconButton>
        </div>
      </div>

      {isLoading ? (<ScreenSpinner size="large" />) : (
        <>
          <div className={cn(style['end-game-main-content'])}>
            <div className={cn(style['end-game-earned-wrapper'])}>
              <Text className={cn(style['end-game-earned-title'])}>
                Заработано:
              </Text>
              <div className={cn(style['end-game-earned'])}>
                <Text className={cn(style['end-game-earned-count'])}>
                  {earnedCoin}
                </Text>
                <MoreCoins />
              </div>
            </div>

            <div className={cn(style['end-game-title-wrapper'])}>
              <Text className={cn(style['end-game-title'])}>
                {lose && 'Не грусти!'}
                {win && 'Поздравляем!'}
              </Text>
            </div>

            <div className={cn(style['end-game-description-wrapper'])}>
              <Text className={cn(style['end-game-description'])}>
                {isMoreGamesAvailable ? 'Ты можешь сыграть\nещё одну игру!' : `Следующая игра станет\nдоступна через ${timeUntilNextGame} часов.`}
              </Text>
            </div>
          </div>

          <div className={cn(style['end-game-button-wrapper'])}>
            <MainButton
              text={isMoreGamesAvailable ? 'Играть' : 'На главную'}
              onClick={go}
              goTo={isMoreGamesAvailable ? 'gameBoard' : 'home'}
            />
          </div>

        </>
      )}
    </MainLayout>
  </Panel>
);

EndGamePanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  isMoreGamesAvailable: PropTypes.bool,
  lose: PropTypes.bool,
  win: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  isLoading: PropTypes.bool,
  earnedCoin: PropTypes.number,
};

export default EndGamePanel;
