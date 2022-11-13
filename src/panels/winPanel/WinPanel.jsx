import React from 'react';
import PropTypes from 'prop-types';

import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const WinPanel = ({
  id, go, earnedCoin, isLoading, isMoreGamesAvailable, timeUntilNextGame, isMobile,
}) => (
  <EndGamePanel
    id={id}
    go={go}
    win
    isMoreGamesAvailable={isMoreGamesAvailable}
    timeUntilNextGame={timeUntilNextGame}
    isLoading={isLoading}
    earnedCoin={String(Number(earnedCoin))}
    isMobile={isMobile}
  />
);

WinPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  earnedCoin: PropTypes.number,
  isLoading: PropTypes.bool,
  isMoreGamesAvailable: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  isMobile: PropTypes.bool,
};

export default WinPanel;
