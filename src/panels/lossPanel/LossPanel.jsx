import React from 'react';
import PropTypes from 'prop-types';

import './LossPanel.css';
import EndGamePanel from '../../shared/endGamePanel/EndGamePanel';

const LossPanel = ({ id, go }) => (
  <EndGamePanel
    id={id}
    go={go}
    lose
    isMoreGamesAvailable={true}
    timeUntilNextGame={12}
    isLoading={false}
    earnedCoin={0}
  />
);

LossPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default LossPanel;
