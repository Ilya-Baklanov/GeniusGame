import React from 'react';

import { Text } from '@vkontakte/vkui';

import './Motivator.css';
import { MOTIVATOR } from '../../../assets/constants/constants';

const Motivator = () => {
  const motivatorImages = {};
  MOTIVATOR.forEach((item) => {
    motivatorImages[item.name] = item.img;
  });

  return (
    <div className="motivator">
      <img className="lamp" src={`${motivatorImages.lamp}`} alt="лампа" />
      <img className="headphones" src={`${motivatorImages.headphones}`} alt="наушники" />
      <img className="headset" src={`${motivatorImages.headset}`} alt="гарнитура" />
      <div className="waffleIron-wrapper">
        <img className="wafer" src={`${motivatorImages.wafer}`} alt="вафля" />
        <img className="waffleIron" src={`${motivatorImages.waffleIron}`} alt="вафельница" />
      </div>
      <img className="watch" src={`${motivatorImages.watch}`} alt="часы наручные" />
      <img className="tablet" src={`${motivatorImages.tablet}`} alt="планшет" />
      <img className="laptop" src={`${motivatorImages.laptop}`} alt="ноутбук" />

      <Text className="motivator-text">
        {'Играй\n и покупай'}
      </Text>
    </div>
  );
};

export default Motivator;
