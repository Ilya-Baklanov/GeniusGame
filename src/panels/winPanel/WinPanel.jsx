import React from 'react';
import PropTypes from 'prop-types';

import './WinPanel.css';
import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const WinPanel = ({
  id, go, earnedCoin, amountCoins,
}) => (
  <EndGamePanel
    id={id}
    go={go}
    win
    isMoreGamesAvailable={true}
    timeUntilNextGame={12}
    isLoading={false}
    earnedCoin={String(Number(earnedCoin) - Number(amountCoins))}
  />
);

WinPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  earnedCoin: PropTypes.string.isRequired,
  amountCoins: PropTypes.string.isRequired,
};

export default WinPanel;
