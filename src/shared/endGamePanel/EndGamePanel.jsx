import React, { useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Text,
  IconButton,
  ScreenSpinner,
} from "@vkontakte/vkui";

import MoreCoins from "../../assets/image/moreCoins.svg?react";
import CloseGray from "../../assets/image/closeGray.svg?react";
import MainLogo from "../../assets/image/main_logo.svg?react";
import style from "./EndGamePanel.module.css";
import { APP_NAME } from "../../assets/constants/constants";
import MainLayout from "../mainLayout/MainLayout";
import MainButton from "../mainButton/MainButton";
import Timer from "../timer/Timer";
import { stringEndFormatterByPoints } from "../../shared/helpers/stringEndFormatterByPoints";
import { BackButton } from "../backButton/BackButton";

const EndGamePanel = ({
  id,
  go,
  isMoreGamesAvailable,
  loss,
  win,
  timeUntilNextGame,
  isLoading,
  earnedCoin,
  isMobile,
  picturePath,
}) => {
  const hours = useMemo(
    () => Math.trunc((timeUntilNextGame / 3600) % 60),
    [timeUntilNextGame]
  );
  const minutes = useMemo(
    () => Math.trunc((timeUntilNextGame / 60) % 60),
    [timeUntilNextGame]
  );

  const hoursText = useMemo(() => {
    switch (true) {
      case hours > 5:
        return `${hours} часов`;
      case hours > 1 && hours < 5:
        return `${hours} часа`;
      case hours === 1:
        return `${hours} час`;
      default:
        return "";
    }
  }, [hours]);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home" />}>
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout backgroundColor="secondary">
        <div className={cn(style["end-game-wrapper"])}>
          <div className={cn(style["end-game-header"])}>
            <BackButton
              onClick={go}
              goTo="home"
              className={cn(style["end-game-close-button"])}
            />
          </div>
          {isLoading ? (
            <ScreenSpinner size="large" />
          ) : (
            <>
              <div className={cn(style.picture)}>
                <img src={picturePath} alt="Игра окончена" />
              </div>
              <div className={cn(style["end-game-main-content"])}>
                <Text className={cn(style["end-game-title"])}>
                  {loss && "Не грустите!"}
                  {win && "Поздравляем!"}
                </Text>
                <div className={cn(style["end-game-earned-wrapper"])}>
                  <Text className={cn(style["end-game-earned-title"])}>
                    Заработано:
                  </Text>
                  <div className={cn(style["end-game-earned"])}>
                    <MoreCoins />
                    <Text className={cn(style["end-game-earned-count"])}>
                      {earnedCoin}
                    </Text>
                    <Text className={cn(style["end-game-earned-text"])}>
                      {stringEndFormatterByPoints(earnedCoin)}
                    </Text>
                  </div>
                </div>
                <Text className={cn(style["end-game-description"])}>
                  {isMoreGamesAvailable
                    ? "Вы можете сыграть\nещё одну игру"
                    : `Следующая игра станет\nдоступна через ${hoursText} ${
                        minutes ? `${minutes} минут` : ""
                      }`}
                </Text>
              </div>
              <MainButton
                text={isMoreGamesAvailable ? "Играть" : "На главную"}
                onClick={() =>
                  go(null, isMoreGamesAvailable ? "gameBoard" : "home")
                }
                isFullWidth
              />
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
  loss: PropTypes.bool,
  win: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  isLoading: PropTypes.bool,
  earnedCoin: PropTypes.number,
  isMobile: PropTypes.bool,
  picturePath: PropTypes.string,
};

export default EndGamePanel;
