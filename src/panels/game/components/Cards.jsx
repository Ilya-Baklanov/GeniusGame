/* eslint-disable no-param-reassign */
import React, {
  useCallback, useLayoutEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import { CARDS } from '../../../assets/constants/constants';
import Card from './Card';
import './Cards.css';

const arrayShuffle = (array) => {
  let j;
  let temp;
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

const Cards = ({ disable, onGuessed }) => {
  const [items, setItems] = useState(arrayShuffle(CARDS));
  const [indexActiveCard, setIndexActiveCard] = useState(null);
  const [isActiveChecking, setIsActiveChecking] = useState(false);

  useLayoutEffect(() => {
    let editedCardsList = items.map((item) => ({ ...item, stat: 'preview' }));
    setItems([...editedCardsList]);

    setTimeout(() => {
      editedCardsList = items.map((item) => ({ ...item, stat: '' }));
      setItems([...editedCardsList]);
    }, 3000);
  }, []);

  const check = useCallback((checkableCardIndex) => {
    setIsActiveChecking(true);
    if (items[checkableCardIndex].id === items[indexActiveCard].id) {
      const editedCardsList = items.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: 'correct' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(null);
      setIsActiveChecking(false);
      onGuessed();
    } else {
      let editedCardsList = items.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: 'wrong' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(null);

      setTimeout(() => {
        editedCardsList = items.map((item, index) => (index === checkableCardIndex || index === indexActiveCard ? { ...item, stat: '' } : item));
        setItems([...editedCardsList]);
        setIsActiveChecking(false);
      }, 1000);
    }
  }, [indexActiveCard, items]);

  const handleClick = useCallback((cardIndex) => {
    if (indexActiveCard === null) {
      const editedCardsList = items.map((item, index) => (index === cardIndex ? { ...item, stat: 'checked' } : item));
      setItems([...editedCardsList]);
      setIndexActiveCard(cardIndex);
    } else {
      check(cardIndex);
    }
  }, [indexActiveCard, items]);

  return (
    <div className="cards-container">
      { items.map((item, index) => (
        <Card key={index} item={item} index={index} handleClick={handleClick} disable={disable || item.stat !== '' || isActiveChecking} />
      )) }
    </div>
  );
};

Cards.propTypes = {
  disable: PropTypes.bool,
  onGuessed: PropTypes.func,
};

export default Cards;
