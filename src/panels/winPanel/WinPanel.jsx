import React from 'react';
import PropTypes from 'prop-types';

import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const WinPanel = ({
  id, go, earnedCoin, isLoading,
}) => (
  <EndGamePanel
    id={id}
    go={go}
    win
    isMoreGamesAvailable={true}
    timeUntilNextGame={12}
    isLoading={isLoading}
    earnedCoin={String(Number(earnedCoin))}
  />
);

WinPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  earnedCoin: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default WinPanel;
