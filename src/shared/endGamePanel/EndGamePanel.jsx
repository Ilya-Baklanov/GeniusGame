import React, { useMemo } from 'react';
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
import Timer from '../timer/Timer';

const EndGamePanel = ({
  id, go, isMoreGamesAvailable, lose, win, timeUntilNextGame, isLoading, earnedCoin, isMobile,
}) => {
  const hours = useMemo(() => Math.trunc((timeUntilNextGame / 3600) % 60), [timeUntilNextGame]);
  const minutes = useMemo(() => Math.trunc((timeUntilNextGame / 60) % 60), [timeUntilNextGame]);

  const hoursText = useMemo(() => {
    switch (true) {
      case hours > 5:
        return `${hours} часов`;
      case hours > 1 && hours < 5:
        return `${hours} часа`;
      case hours === 1:
        return `${hours} час`;
      default:
        return '';
    }
  }, [hours]);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader
          left={<PanelHeaderBack onClick={go} data-to="home" />}
        >
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout>
        <div className={cn(style['end-game-wrapper'])}>
          <div className={cn(style['end-game-header'])}>
            <div className={cn(style['end-game-close-button-wrapper'])}>
              <IconButton
                hasActive={false}
                hasHover={false}
                hoverMode=""
                focusVisibleMode=""
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
                    {isMoreGamesAvailable
                      ? 'Ты можешь сыграть\nещё одну игру!'
                      : `Следующая игра станет\nдоступна через ${hoursText} ${minutes ? `${minutes} минут` : ''}.`}
                  </Text>
                </div>
              </div>
              <div className={cn(style['end-game-button-wrapper'])}>
                <MainButton
                  text={isMoreGamesAvailable ? 'Играть' : 'На главную'}
                  onClick={() => go(null, isMoreGamesAvailable ? 'gameBoard' : 'home')}
                />
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </Panel>
  );
};

EndGamePanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  isMoreGamesAvailable: PropTypes.bool,
  lose: PropTypes.bool,
  win: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  isLoading: PropTypes.bool,
  earnedCoin: PropTypes.number,
  isMobile: PropTypes.bool,
};

export default EndGamePanel;
