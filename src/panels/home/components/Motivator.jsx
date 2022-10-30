import React from 'react';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';

import style from './Motivator.module.css';
import { MOTIVATOR } from '../../../assets/constants/constants';

const Motivator = () => {
  const motivatorImages = {};
  MOTIVATOR.forEach((item) => {
    motivatorImages[item.name] = item.img;
  });

  return (
    <div className={cn(style.motivator)}>
      <img className={cn(style.lamp)} src={`${motivatorImages.lamp}`} alt="лампа" />
      <img className={cn(style.headphones)} src={`${motivatorImages.headphones}`} alt="наушники" />
      <img className={cn(style.headset)} src={`${motivatorImages.headset}`} alt="гарнитура" />
      <div className={cn(style['waffleIron-wrapper'])}>
        <img className={cn(style.wafer)} src={`${motivatorImages.wafer}`} alt="вафля" />
        <img className={cn(style.waffleIron)} src={`${motivatorImages.waffleIron}`} alt="вафельница" />
      </div>
      <img className={cn(style.watch)} src={`${motivatorImages.watch}`} alt="часы наручные" />
      <img className={cn(style.tablet)} src={`${motivatorImages.tablet}`} alt="планшет" />
      <img className={cn(style.laptop)} src={`${motivatorImages.laptop}`} alt="ноутбук" />

      <Text className={cn(style['motivator-text'])}>
        {'Играй\n и покупай'}
      </Text>
    </div>
  );
};

export default Motivator;
