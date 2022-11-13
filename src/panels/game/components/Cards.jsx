import React, {
  useCallback, useLayoutEffect, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Card from './Card';
import style from './Cards.module.css';
import useGetRandomGameCards from '../../../shared/hooks/useGetRandomGameCards/useGetRandomGameCards';

const Cards = ({ disable, onGuessed, previewDelay }) => {
  const [indexActiveCard, setIndexActiveCard] = useState(null);
  const [isActiveChecking, setIsActiveChecking] = useState(false);

  const { items, setItems } = useGetRandomGameCards();

  useLayoutEffect(() => {
    let editedCardsList = items?.map((item) => ({ ...item, stat: 'preview' }));
    setItems([...editedCardsList]);

    setTimeout(() => {
      editedCardsList = items?.map((item) => ({ ...item, stat: '' }));
      setItems([...editedCardsList]);
    }, previewDelay * 1000);
  }, []);

  const check = useCallback((checkableCardIndex) => {
    setIsActiveChecking(true);
    if (items?.[checkableCardIndex].id === items?.[indexActiveCard].id) {
      const editedCardsList = items?.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: 'correct' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(null);
      setIsActiveChecking(false);
      onGuessed();
    } else {
      let editedCardsList = items?.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: 'wrong' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(null);

      setTimeout(() => {
        editedCardsList = items?.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: '' } : item));
        setItems([...editedCardsList]);
        setIsActiveChecking(false);
      }, 1000);
    }
  }, [indexActiveCard, items]);

  const handleClick = useCallback((cardIndex) => {
    if (indexActiveCard === null) {
      const editedCardsList = items?.map((item, index) => (index === cardIndex ? { ...item, stat: 'checked' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(cardIndex);
    } else {
      check(cardIndex);
    }
  }, [indexActiveCard, items]);

  return (
    <div className={cn(style['cards-container'])}>
      { items && items?.map((item, index) => (
        <Card key={index} item={item} index={index} handleClick={handleClick} disable={disable || item.stat !== '' || isActiveChecking} />
      )) }
    </div>
  );
};

Cards.propTypes = {
  disable: PropTypes.bool,
  onGuessed: PropTypes.func,
  previewDelay: PropTypes.number,
};

export default Cards;
