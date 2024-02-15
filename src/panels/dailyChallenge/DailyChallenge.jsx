/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  IconButton,
  Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, Text,
} from '@vkontakte/vkui';

import style from './DailyChallenge.module.css';
import MainButton from '../../shared/mainButton/MainButton';
import { APP_NAME, DAILY_CHALLENGE_PICTURES } from '../../assets/constants/constants';
import { CloseGray, MainLogo } from '../../assets/image';
import { PanelTypes } from '../../structure';

const DailyChallenge = ({
  id,
  go,
  isLoading,
  isMobile,
  dailyChallengeCount,
  onStartGame,
  platform,
}) => {
  const picturePath = DAILY_CHALLENGE_PICTURES
    .find((picture) => picture.dayNumber === dailyChallengeCount)?.img
    ?? DAILY_CHALLENGE_PICTURES[0].img;

  return (
    <Panel id={id}>
      {!isMobile && (
      <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home" />}>
        {APP_NAME}
      </PanelHeader>
      )}
      {isLoading ? (
        <ScreenSpinner size="large" />
      ) : (
        <div className={cn(style.main_layout_wrapper)}>
          <div className={cn(style.main_layout, style[platform])}>
            <div className={style.main_layout_top}>
              <div className={cn(style.header)}>
                <div className={cn(style.logo)}>
                  <MainLogo />
                </div>
                <IconButton
                  aria-label="Крестик для закрытия текущего окна"
                  hasActive={false}
                  hasHover={false}
                  hoverMode=""
                  focusVisibleMode=""
                  onClick={go}
                  data-to={PanelTypes.home}
                  className={style.close_button}
                >
                  <CloseGray />
                </IconButton>
              </div>
              <div className={style.daily_count_wrapper}>
                {new Array(5).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      style.daily_count_item,
                      {
                        [style.active]: dailyChallengeCount === index + 1,
                        [style.complete]: dailyChallengeCount > index + 1,
                      },
                    )}
                  >
                    <div className={style.daily_count_line} />
                    <div className={style.daily_count_text_wrapper}>
                      <Text className={style.daily_count_text}>
                        {`День ${index + 1}`}
                      </Text>
                      { dailyChallengeCount === 5 && dailyChallengeCount === index + 1 && (
                      <div className={style.daily_count_text_bonus_wrapper}>
                        <Text className={style.daily_count_text_bonus}>
                          X2
                        </Text>
                      </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(style.daily_challenge_picture_wrapper, style[`day_${dailyChallengeCount}`])}>
              <img src={picturePath} alt="" />
            </div>
            <div className={style.main_layout_bottom}>
              <div className={style.daily_challenge_description}>
                <Text className={style.daily_challenge_description_title}>
                  {`День ${dailyChallengeCount}`}
                </Text>
                <Text className={style.daily_challenge_description_text}>
                  {dailyChallengeCount === 5
                    ? 'Умничка! Сегодня можешь получить\nв два раза больше баллов!'
                    : 'Заходи в игру пять дней подряд,\nчтобы удвоить свои бонусы!'}
                </Text>
              </div>
              <MainButton
                isFullWidth
                text="Начать игру"
                onClick={onStartGame}
                className={style['not-allowed-to-friends-list-button']}
              />
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
};

DailyChallenge.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  dailyChallengeCount: PropTypes.number,
  onStartGame: PropTypes.func,
  platform: PropTypes.string,
};

export default DailyChallenge;
