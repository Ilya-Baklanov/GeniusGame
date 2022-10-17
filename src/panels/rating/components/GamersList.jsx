import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Text } from '@vkontakte/vkui';

import './GamersList.css';
import { MoreCoins } from '../../../assets/image';

const GamersList = ({ positionOnRating, gamersOnRating, gamersList }) => (
  <div className="gamers-list-wrapper">
    <div className="position-on-rating-wrapper">
      <Text className="position-on-rating-your">
        {`Вы ${positionOnRating}`}
      </Text>
      <Text className="position-on-rating-all">
        {`/ ${gamersOnRating}`}
      </Text>
    </div>
    <div className="gamers-list-container">
      {gamersList && gamersList.map(({ avatarSrc, name, score }, index) => (
        <div key={index} className="gamers-list-item-wrapper">
          <div className="gamers-list-item">
            <div className="gamers-list-item-user-info">
              <Avatar src={avatarSrc} className="gamers-list-item-avatar" size={54} />
              <div className="gamers-list-item-name-wrapper">
                <Text className="gamers-list-item-name">
                  {name}
                </Text>
              </div>
            </div>
            <div className="gamers-list-item-score-wrapper">
              <Text className="gamers-list-item-score">
                {score}
              </Text>
              <MoreCoins />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

GamersList.propTypes = {
  positionOnRating: PropTypes.number,
  gamersOnRating: PropTypes.number,
  gamersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    avatarSrc: PropTypes.string,
  })),
};

export default GamersList;
