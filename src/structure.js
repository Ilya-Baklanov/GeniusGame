/* eslint-disable indent */

// export const ViewTypes = {
//   MAIN: 'MAIN',
//   SETTINGS: 'SETTINGS',
// };

export const PanelTypes = {
    home: 'home',
    gameBoard: 'gameBoard',
    promoCode: 'promoCode',
    myPromoCode: 'myPromoCode',
    moreCoins: 'moreCoins',
    rating: 'rating',
    lossGame: 'lossGame',
    winGame: 'winGame',
    poster: 'poster',
    dailyChallenge: 'dailyChallenge',
};

const structure = [
    {
        id: 'main',
        hash: 'main',
        panels: [
            {
                id: 'dailyChallenge',
                hash: '/dailyChallenge',
            },
            {
                id: 'home',
                hash: '/home',
            },
            {
                id: 'gameBoard',
                hash: '/gameBoard',
            },
            {
                id: 'promoCode',
                hash: '/promoCode',
            },
            {
                id: 'myPromoCode',
                hash: '/myPromoCode',
            },
            {
                id: 'moreCoins',
                hash: '/moreCoins',
            },
            {
                id: 'rating',
                hash: '/rating',
            },
            {
                id: 'lossGame',
                hash: '/lossGame',
            },
            {
                id: 'winGame',
                hash: '/winGame',
            },
            {
                id: 'poster',
                hash: '/poster',
            },
        ],
    },
];

export default structure;
