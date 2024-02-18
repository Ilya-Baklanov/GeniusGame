/* eslint-disable indent */
export const APP_NAME = 'МегаИгра';

export const CARDS_COUNT = 64;
export const NUMBER_UNIQUE_CARDS_IN_GAME = 10;
export const CARDS = Array(CARDS_COUNT).fill(0).map((_, index) => ({
    id: index,
    img: `./img/${index}.png`,
    stat: '',
}));

export const STATUS_LIST = [
    { statusId: '788', text: 'на спокойном', img: './img/cat1.png' },
    { statusId: '786', text: 'на созвоне\nбез камеры', img: './img/cat2.png' },
    { statusId: '787', text: 'дайте поспать', img: './img/cat3.png' },
];

export const POSTER_PICTURES = [
    { name: 'coin_big', img_w: './img/coin_big_white.png', img_c: './img/coin_big.png' },
    { name: 'coin_small', img_w: './img/coin_small_white.png', img_c: './img/coin_small.png' },
    { name: 'hand_with_phone', img_w: './img/hand_with_phone_white.png', img_c: './img/hand_with_phone.png' },
    { name: 'shoes', img_w: './img/shoes_white.png', img_c: './img/shoes.png' },
    { name: 'headphone_new', img_w: './img/headphone_new_white.png', img_c: './img/headphone_new.png' },
];

export const COMMON_PICTURES = [
    { name: 'MainPicture', img: './img/Home_MainCards.png' },
    { name: 'WinPicture', img: './img/winPicture.png' },
    { name: 'LossPicture', img: './img/lossPicture.png' },
];

export const DAILY_CHALLENGE_PICTURES = [
    { name: 'MainPicture', img: './img/craft_box.png', dayNumber: 1 },
    { name: 'MainPicture', img: './img/craft_box_with_logo.png', dayNumber: 2 },
    { name: 'MainPicture', img: './img/craft_box_with_percent.png', dayNumber: 3 },
    { name: 'MainPicture', img: './img/percent_with_hand.png', dayNumber: 4 },
    { name: 'MainPicture', img: './img/hand_with_stars.png', dayNumber: 5 },
];

export const PROMOCODES = [
    { denomination: 100, description: 'Можно\nиспользовать\nпри заказе\nот 500₽' },
    { denomination: 200, description: 'Можно\nиспользовать\nпри заказе\nот 700₽' },
    { denomination: 300, description: 'Можно\nиспользовать\nпри заказе\nот 1000₽' },
    { denomination: 400, description: 'Можно\nиспользовать\nпри заказе\nот 1300₽' },
    { denomination: 500, description: 'Можно\nиспользовать\nпри заказе\nот 1700₽' },
    { denomination: 600, description: 'Можно\nиспользовать\nпри заказе\nот 2000₽' },
    { denomination: 700, description: 'Можно\nиспользовать\nпри заказе\nот 2500₽' },
    { denomination: 800, description: 'Можно\nиспользовать\nпри заказе\nот 3500₽' },
    { denomination: 900, description: 'Можно\nиспользовать\nпри заказе\nот 4000₽' },
    { denomination: 1000, description: 'Можно использовать при заказе от 5000₽' },
];

export const MORE_COINS_CARDS = [
    {
 id: 'JOIN_GROUP', additionalCoins: 10, title: 'Вступи в группу', description: 'Вступи в официальную группу\nМегамаркета в Вконтакте.', textOnSuccess: 'получено',
},
    {
 id: 'REPOST', additionalCoins: 10, title: 'Раскрась баннер', description: 'Раскрась баннер игры\nи поделись им в своих историях.', textOnSuccess: 'получено',
},
    {
 id: 'STATUS', additionalCoins: 10, title: 'Подбери статус ', description: 'Подбери фирменный статус\nпо настроению.', textOnSuccess: 'получено',
},
];

export const MODAL_PROMO_CODE = 'modal_promo_code';
export const MODAL_GET_PROMO_CODE = 'modal_get_promo_code';
export const MODAL_MORE_COINS_STATUS = 'modal_more_coins_status';
export const MODAL_MORE_COINS_INVITE_FRIENDS = 'modal_more_coins_invite_friends';
export const MODAL_EXIT_CONFIRM = 'modal_exit_confirm';
export const ALERT = 'alert';

export const POST_MESSAGE = 'Астрологи объявили неделю обмена монет из игры на реальные промокоды. Неделя продлится долго, скорей играй и получай подарки от СберМегаМаркета.';
export const POST_PHOTO_ID = '142880902_457244137';

export const PROMOTION_RULES = {
    title: 'Правила акции',
    href: 'https://vk.com/@sbermm-pravila-ispolzovaniya-igrovogo-prilozheniya-megaigra',
};

export const GAME_RULES = {
    title: 'Правила игры',
    href: 'https://vk.com/@sbermm-megaigra-faq',
};

export const CONTACTS_HELP = {
    title: 'Свяжись с нами',
    href: 'mailto:smm@sbermegamarket.ru',
    question: 'Нужна помощь?',
};

export const SBERMEGAMARKET_LINK = 'https://sbermegamarket.ru';

export const RATING_LIMIT = 1000;

export const MAX_AVAILABLE_GAMES_COUNT = 2;

export const GAME_DURATION = 60;

export const COUNTDOWN = 3;
