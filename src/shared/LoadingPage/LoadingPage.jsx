import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Text } from '@vkontakte/vkui';
import { LogoLoader } from '../../assets/image';

import style from './LoadingPage.module.css';

const LoadingPage = ({ downloadPercentage }) => (
  <div className={cn(style['loader-wrapper'])}>
    <div className={cn(style.loader)}>
      <LogoLoader />
      <div className={cn(style.percentage)}>
        <Text className={cn(style.percentage_number)}>
          {downloadPercentage}
        </Text>
        <Text className={cn(style.percentage_symbol)}>
          %
        </Text>
      </div>
    </div>
  </div>
);

LoadingPage.propTypes = {
  downloadPercentage: PropTypes.number,
};

export default LoadingPage;
