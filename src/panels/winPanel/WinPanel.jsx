import React from 'react';
import PropTypes from 'prop-types';

import './WinPanel.css';
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
    isLoading={false}
    earnedCoin={String(Number(earnedCoin))}
     // String(Number(earnedCoin) - Number(amountCoins)) тут так было хз
  />
);

WinPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  earnedCoin: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default WinPanel;
