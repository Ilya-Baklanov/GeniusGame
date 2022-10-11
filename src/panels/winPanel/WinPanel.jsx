import React from 'react';
import PropTypes from 'prop-types';

import './WinPanel.css';
import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const WinPanel = ({ id, go, earnedCoin }) => (
  <EndGamePanel
    id={id}
    go={go}
    win
    isMoreGamesAvailable={true}
    timeUntilNextGame={12}
    isLoading={false}
    earnedCoin={earnedCoin}
  />
);

WinPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  earnedCoin: PropTypes.number,
};

export default WinPanel;
