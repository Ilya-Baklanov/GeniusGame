import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Text,
  IconButton,
} from "@vkontakte/vkui";

import MoreCoins from "../../assets/image/moreCoins.svg?react";
import Close from "../../assets/image/close.svg?react";
import CloseGray from "../../assets/image/closeGray.svg?react";
import RightArrow from '../../assets/image/right_arrow.svg?react';
import Cards from "./components/Cards";
import style from "./Game.module.css";
import Timer from "../../shared/timer/Timer";
import {
  APP_NAME,
  COUNTDOWN,
  GAME_DURATION,
} from "../../assets/constants/constants";
import MainLayout from "../../shared/mainLayout/MainLayout";
import { PanelTypes } from "../../structure";
import { stringEndFormatterByPoints } from "../../shared/helpers/stringEndFormatterByPoints";
import { BackButton } from "../../shared/backButton/BackButton";

const Game = ({
  id,
  go,
  onEndGame,
  onCloseGame,
  isMobile,
  onEndedAdvanceСountdownTime,
  gamesAvailable,
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

  useLayoutEffect(() => {
    if (gamesAvailable <= 0) {
      go(null, PanelTypes.home);
    }
  }, []);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader before={<PanelHeaderBack onClick={closeGameHandler} />}>
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout>
        <div className={cn(style["game-wrapper"])}>
          <div className={cn(style.header)}>
            <div className={cn(style["timer-and-close-wrapper"])}>
              <BackButton onClick={closeGameHandler} />

              <div className={cn(style.timer)}>
                <Timer
                  time={GAME_DURATION}
                  advanceСountdownTime={COUNTDOWN}
                  onEndedAdvanceСountdownTime={endingAdvanceTimeHandler}
                  onEndedTime={endingTimeHandler}
                  className={cn(style.time)}
                />
              </div>
            </div>

            <div className={cn(style["earned-wrapper"])}>
              <Text className={cn(style["earned-title"])}>Заработано:</Text>
              <div className={cn(style.earned)}>
                <MoreCoins />
                <Text className={cn(style["earned-count"])}>
                  {guessedCards}
                </Text>
                <Text className={cn(style["earned-text"])}>
                  {stringEndFormatterByPoints(guessedCards)}
                </Text>
              </div>
            </div>
          </div>
          <div className={cn(style["game-board"])}>
            <Cards
              disable={isDisableGameboard}
              onGuessed={guessingHandler}
              previewDelay={3}
            />
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
