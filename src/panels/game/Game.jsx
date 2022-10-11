import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton,
} from '@vkontakte/vkui';

import { MoreCoins, Close } from '../../assets/image';
import Cards from './components/Cards';
import './Game.css';
import Timer from '../../shared/timer/Timer';
import { APP_NAME } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';

const Game = ({
  id, go, amountCoins, onEndGame,
}) => {
  const [isDisableGameboard, setIsDisableGameboard] = useState(true);
  const [guessedCards, setGuessedCards] = useState(0);

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
        left={<PanelHeaderBack onClick={go} data-to="home" />}
      >
        {APP_NAME}
      </PanelHeader>

      <MainLayout>
        <div className="header">
          <div className="earned-wrapper">
            <Text className="earned-title">
              Заработано:
            </Text>
            <div className="earned">
              <Text className="earned-count">
                {amountCoins + guessedCards}
              </Text>
              <MoreCoins />
            </div>
          </div>
          <div className="timer">
            <Text className="time">
              <Timer
                time={600}
                advanceСountdownTime={3}
                onEndedAdvanceСountdownTime={endingAdvanceTimeHandler}
                onEndedTime={endingTimeHandler}
              />
            </Text>
          </div>
          <div className="close-button-wrapper">
            <IconButton
              onClick={go}
              data-to="home"
              className="close-button"
            >
              <Close />
            </IconButton>
          </div>
        </div>

        <div className="game-board">
          <Cards disable={isDisableGameboard} onGuessed={guessingHandler} />
        </div>
      </MainLayout>
    </Panel>
  );
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.number,
  onEndGame: PropTypes.func,
};

export default Game;
