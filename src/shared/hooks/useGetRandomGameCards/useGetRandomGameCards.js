/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useCallback } from 'react';

import { CARDS, CARDS_COUNT, NUMBER_UNIQUE_CARDS_IN_GAME } from '../../../assets/constants/constants';

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

function getRandomNumber(arr) {
    const randomNumber = Math.ceil(Math.random() * CARDS_COUNT);
    return (arr.includes(randomNumber) || randomNumber >= CARDS_COUNT)
        ? getRandomNumber(arr)
        : randomNumber;
}

function toRandomArray(arrLength) {
    const arr = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrLength; i++) {
        arr.push(getRandomNumber(arr));
    }

    return arr;
}

const getRandomGameCards = () => {
    const randomNumbersArray = toRandomArray(NUMBER_UNIQUE_CARDS_IN_GAME);
    const listAllCardsNumberInGame = [...randomNumbersArray, ...randomNumbersArray];
    const shuffledListAllCardsNumberInGame = arrayShuffle(listAllCardsNumberInGame);
    console.log('>>>randomNumbersArray: ', randomNumbersArray);
    console.log('>>>listAllCardsNumberInGame: ', listAllCardsNumberInGame);
    console.log('>>>shuffledListAllCardsNumberInGame: ', shuffledListAllCardsNumberInGame);
    return shuffledListAllCardsNumberInGame.map((cardNumber) => CARDS[cardNumber]);
};

const useGetRandomGameCards = () => {
    const [items, setItems] = useState(getRandomGameCards());
    console.log('useGetRandomGameCards_items: ', items);

    return {
        items,
        setItems,
    };
};

export default useGetRandomGameCards;
