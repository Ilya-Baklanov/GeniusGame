/* eslint-disable indent */
import { useEffect, useState } from 'react';

import { MORE_COINS_CARDS } from '../../../assets/constants/constants';

const useGetMoreCoinsData = (circumstances) => {
    const [cardList, setCardList] = useState(MORE_COINS_CARDS);

    useEffect(() => {
        setCardList((previousCardList) => previousCardList.map((card, index) => ({
            ...card,
            isComplete: circumstances[index] === '1',
        })));
    }, [circumstances]);

    return {
        cardList,
    };
};

export default useGetMoreCoinsData;
