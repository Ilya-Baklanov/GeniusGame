import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Avatar, Text } from '@vkontakte/vkui';

import style from './GamersList.module.css';
import { MoreCoins } from '../../../assets/image';

const GamersList = ({ positionOnRating, gamersOnRating, gamersList }) => (
  <div className={cn(style['gamers-list-wrapper'])}>
    <div className={cn(style['position-on-rating-wrapper'])}>
      <Text className={cn(style['position-on-rating-your'])}>
        {`Вы ${positionOnRating}`}
      </Text>
      <Text className={cn(style['position-on-rating-all'])}>
        {`/ ${gamersOnRating}`}
      </Text>
    </div>
    <div className={cn(style['gamers-list-container'])}>
      {gamersList && gamersList.map(({ avatarSrc, name, score }, index) => (
        <div key={index} className={cn(style['gamers-list-item-wrapper'])}>
          <div className={cn(style['gamers-list-item'])}>
            <div className={cn(style['gamers-list-item-user-info'])}>
              <Avatar src={avatarSrc} className={cn(style['gamers-list-item-avatar'])} size={54} />
              <div className={cn(style['gamers-list-item-name-wrapper'])}>
                <Text className={cn(style['gamers-list-item-name'])}>
                  {name}
                </Text>
              </div>
            </div>
            <div className={cn(style['gamers-list-item-score-wrapper'])}>
              <Text className={cn(style['gamers-list-item-score'])}>
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
