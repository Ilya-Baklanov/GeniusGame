import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton,
} from '@vkontakte/vkui';

import { MoreCoins, Close } from '../../assets/image';
import Cards from './components/Cards';
import style from './Game.module.css';
import Timer from '../../shared/timer/Timer';
import { APP_NAME } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';

const Game = ({
  id, go, onEndGame, onCloseGame,
}) => {
  const [isDisableGameboard, setIsDisableGameboard] = useState(true);
  const [guessedCards, setGuessedCards] = useState(0);

  const closeGameHandler = useCallback(() => {
    go(null, 'home');
    onCloseGame();
  }, [go, onCloseGame]);

  const endingAdvanceTimeHandler = useCallback(() => {
    setIsDisableGameboard(false);
  }, []);

  const endingTimeHandler = useCallback(() => {
    if (guessedCards === 0) {
      onEndGame(guessedCards);
      go(null, 'lossGame');
    } else {
      onEndGame(guessedCards);
      go(null, 'winGame');
    }
  }, [guessedCards]);

  const guessingHandler = useCallback(() => {
    setGuessedCards((prev) => prev + 1);
  }, []);

  const winHandler = useCallback(() => {
    onEndGame(guessedCards);
    go(null, 'winGame');
  }, [guessedCards]);

  useEffect(() => {
    if (guessedCards === 10) {
      winHandler();
    }
  }, [guessedCards]);

  return (
    <Panel id={id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={closeGameHandler} />}
      >
        {APP_NAME}
      </PanelHeader>

      <MainLayout>
        <div className={cn(style.header)}>
          <div className={cn(style['earned-wrapper'])}>
            <Text className={cn(style['earned-title'])}>
              Заработано:
            </Text>
            <div className={cn(style.earned)}>
              <Text className={cn(style['earned-count'])}>
                {guessedCards}
              </Text>
              <MoreCoins />
            </div>
          </div>
          <div className={cn(style.timer)}>
            <Text className={cn(style.time)}>
              <Timer
                time={60}
                advanceСountdownTime={3}
                onEndedAdvanceСountdownTime={endingAdvanceTimeHandler}
                onEndedTime={endingTimeHandler}
              />
            </Text>
          </div>
          <div className={cn(style['close-button-wrapper'])}>
            <IconButton
              onClick={closeGameHandler}
              className={cn(style['close-button'])}
              hasActive={false}
              hasHover={false}
              hoverMode=""
              focusVisibleMode=""
            >
              <Close />
            </IconButton>
          </div>
        </div>

        <div className={cn(style['game-board'])}>
          <Cards disable={isDisableGameboard} onGuessed={guessingHandler} previewDelay={3} />
        </div>
      </MainLayout>
    </Panel>
  );
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  onEndGame: PropTypes.func,
  onCloseGame: PropTypes.func,
};

export default Game;
