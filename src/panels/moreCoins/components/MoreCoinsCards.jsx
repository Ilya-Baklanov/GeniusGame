import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './MoreCoinsCards.module.css';
import Card from './Card';
import useGetMoreCoinsData from '../../../shared/hooks/useGetMoreCoinsData/useGetMoreCoinsData';

const MoreCoinsCards = ({ go, onClickToCard, circumstances }) => {
  const { cardList } = useGetMoreCoinsData(circumstances);
  return (
    <div className={cn(style['more-coins-cards-wrapper'])}>
      {cardList.map(({
        id,
        text,
        additionalCoins,
        isComplete,
      }, index) => (
        <Card
          key={index}
          text={text}
          additionalCoins={id === 'STATUS' && isComplete ? null : additionalCoins}
          isComplete={id !== 'STATUS' && isComplete}
          onClick={() => onClickToCard(id)}
        />
      ))}
    </div>
  );
};

MoreCoinsCards.propTypes = {
  go: PropTypes.func,
  onClickToCard: PropTypes.func,
  circumstances: PropTypes.string,
};

export default MoreCoinsCards;
