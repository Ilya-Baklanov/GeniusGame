import React from 'react';
import PropTypes from 'prop-types';

import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const LossPanel = ({
  id, go, isMoreGamesAvailable, timeUntilNextGame, isMobile, isLoading,
}) => (
  <EndGamePanel
    id={id}
    go={go}
    lose
    isMoreGamesAvailable={isMoreGamesAvailable}
    timeUntilNextGame={timeUntilNextGame}
    isLoading={isLoading}
    earnedCoin={0}
    isMobile={isMobile}
  />
);

LossPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isMoreGamesAvailable: PropTypes.bool,
  timeUntilNextGame: PropTypes.number,
  isMobile: PropTypes.bool,
};

export default LossPanel;
