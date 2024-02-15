import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton,
} from '@vkontakte/vkui';

import { MoreCoins, Close, CloseGray } from '../../assets/image';
import Cards from './components/Cards';
import style from './Game.module.css';
import Timer from '../../shared/timer/Timer';
import { APP_NAME, COUNTDOWN, GAME_DURATION } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';
import { PanelTypes } from '../../structure';

const Game = ({
  id, go, onEndGame, onCloseGame, isMobile, onEndedAdvanceСountdownTime, gamesAvailable,
}) => {
  const [isDisableGameboard, setIsDisableGameboard] = useState(true);
  const [guessedCards, setGuessedCards] = useState(0);

  const closeGameHandler = useCallback(() => {
    onCloseGame();
  }, [go, onCloseGame]);

  const endingAdvanceTimeHandler = useCallback(() => {
    // onEndedAdvanceСountdownTime();
    setIsDisableGameboard(false);
  }, []);

  const endingTimeHandler = useCallback(() => {
    if (guessedCards === 0) {
      onEndGame(guessedCards);
      go(null, PanelTypes.lossGame);
    } else {
      onEndGame(guessedCards);
      go(null, PanelTypes.winGame);
    }
  }, [guessedCards]);

  const guessingHandler = useCallback(() => {
    setGuessedCards((prev) => prev + 1);
  }, []);

  const winHandler = useCallback(() => {
    onEndGame(guessedCards);
    go(null, PanelTypes.winGame);
  }, [guessedCards]);

  useEffect(() => {
    if (guessedCards === 10) {
      winHandler();
    }
  }, [guessedCards]);

  useEffect(() => {
    if (gamesAvailable <= 0) {
      go(null, PanelTypes.home);
    }
  }, []);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader
          before={<PanelHeaderBack onClick={closeGameHandler} />}
        >
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout>
        <div className={cn(style['game-wrapper'])}>
          <div className={cn(style.header)}>
            <div className={cn(style['earned-wrapper'])}>
              <Text className={cn(style['earned-title'])}>
                Заработано:
              </Text>
              <div className={cn(style.earned)}>
                <MoreCoins />
                <Text className={cn(style['earned-count'])}>
                  {guessedCards}
                </Text>
                <Text className={cn(style['earned-text'])}>
                  балла/ов
                </Text>
              </div>
            </div>
            <div className={cn(style['timer-and-close-wrapper'])}>
              <div className={cn(style.timer)}>
                <Timer
                  time={GAME_DURATION}
                  advanceСountdownTime={COUNTDOWN}
                  onEndedAdvanceСountdownTime={endingAdvanceTimeHandler}
                  onEndedTime={endingTimeHandler}
                  className={cn(style.time)}
                />
              </div>
              <IconButton
                aria-label="Крестик для закрытия текущего окна"
                onClick={closeGameHandler}
                className={cn(style['close-button'])}
                hasActive={false}
                hasHover={false}
                hoverMode=""
                focusVisibleMode=""
              >
                <CloseGray />
              </IconButton>
            </div>
          </div>
          <div className={cn(style['game-board'])}>
            <Cards disable={isDisableGameboard} onGuessed={guessingHandler} previewDelay={3} />
          </div>
        </div>
      </MainLayout>
    </Panel>
  );
};

Game.propTypes = {
  gamesAvailable: PropTypes.number,
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  onEndGame: PropTypes.func,
  onCloseGame: PropTypes.func,
  isMobile: PropTypes.bool,
  onEndedAdvanceСountdownTime: PropTypes.func,
};

export default Game;
