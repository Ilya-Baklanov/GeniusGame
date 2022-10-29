/* eslint-disable indent */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { MORE_COINS_CARDS } from '../../../assets/constants/constants';

const useGetMoreCoinsData = () => {
    const [cardList, setCardList] = useState(MORE_COINS_CARDS);

    // запрос на бэк, получение данных о выполненых условиях

    // тут редактируем карточки с условиями, делая их выполнеными/невыполнеными
    useEffect(() => {
        setCardList((previousCardList) => previousCardList.map((card, index) => ({
            ...card,
            // isComplete: index === 2,
        })));
    }, []);

    return {
        cardList,
    };
};

// useGetMoreCoinsData.propTypes = {
//     pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default useGetMoreCoinsData;
