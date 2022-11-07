/* eslint-disable indent */
export const APP_NAME = 'МегаИгра';

export const MOTIVATOR = [
    { name: 'lamp', img: '/img/lamp.png' },
    { name: 'headphones', img: '/img/headphones.png' },
    { name: 'headset', img: '/img/headset.png' },
    { name: 'wafer', img: '/img/wafer.png' },
    { name: 'waffleIron', img: '/img/waffleIron.png' },
    { name: 'watch', img: '/img/watch.png' },
    { name: 'tablet', img: '/img/tablet.png' },
    { name: 'laptop', img: '/img/laptop.png' },
];

export const CARDS_COUNT = 64;
export const NUMBER_UNIQUE_CARDS_IN_GAME = 10;
export const CARDS = Array(CARDS_COUNT).fill().map((_, index) => ({
    id: index,
    img: `/img/${index + 1}.png`,
    stat: '',
}));

export const STATUS_LIST = [
    { text: 'на спокойном', img: '/img/cat1.png' },
    { text: 'на созвоне\nбез камеры', img: '/img/cat2.png' },
    { text: 'дайте поспать', img: '/img/cat3.png' },
];

export const POSTER_PICTURES = [
    { name: 'coin1', img_w: '/img/coin1_w.png', img_c: '/img/coin1_c.png' },
    { name: 'coin2', img_w: '/img/coin2_w.png', img_c: '/img/coin2_c.png' },
    { name: 'coin3', img_w: '/img/coin3_w.png', img_c: '/img/coin3_c.png' },
    { name: 'gamepad', img_w: '/img/gamepad_w.png', img_c: '/img/gamepad_c.png' },
    { name: 'plus1', img_w: '/img/plus1_w.png', img_c: '/img/plus1_c.png' },
    { name: 'plus2', img_w: '/img/plus2_w.png', img_c: '/img/plus2_c.png' },
    { name: 'logo', img_w: '/img/logo_w.png', img_c: '/img/logo_b.png' },
    { name: 'phone', img: '/img/phone.png' },
    { name: 'BG', img: '/img/BG_1.png' },
];

export const PROMOCODES = [
    { denomination: 100, description: 'Можно\n использовать\nпри заказе\nот 500₽' },
    { denomination: 200, description: 'Можно\n использовать\nпри заказе\nот 700₽' },
    { denomination: 300, description: 'Можно\n использовать\nпри заказе\nот 1000₽' },
    { denomination: 400, description: 'Можно\n использовать\nпри заказе\nот 1300₽' },
    { denomination: 500, description: 'Можно\n использовать\nпри заказе\nот 1700₽' },
    { denomination: 600, description: 'Можно\n использовать\nпри заказе\nот 2000₽' },
    { denomination: 700, description: 'Можно\n использовать\nпри заказе\nот 2500₽' },
    { denomination: 800, description: 'Можно\n использовать\nпри заказе\nот 3500₽' },
    { denomination: 900, description: 'Можно\n использовать\nпри заказе\nот 4000₽' },
    { denomination: 1000, description: 'Можно использовать при заказе от 5000₽' },
];

export const MORE_COINS_CARDS = [
    { id: 'JOIN_GROUP', additionalCoins: 10, text: 'Вступи в официальную группу\nСберМегаМаркета в Вконтакте' },
    { id: 'REPOST', additionalCoins: 10, text: 'Раскрась баннер игры\nи поделись им на своей странице' },
    { id: 'STATUS', additionalCoins: 10, text: 'Подбери фирменный статус\nпо настроению' },
    { id: 'INVITE_FRIENDS', text: 'Пригласи к участию друзей' },
];

export const MODAL_PROMO_CODE = 'modal_promo_code';
export const MODAL_GET_PROMO_CODE = 'modal_get_promo_code';
export const MODAL_MORE_COINS = 'modal_more_coins';

export const POST_MESSAGE = 'Астрологи объявили неделю обмена монет из игры на реальные промокоды. Неделя продлится долго, скорей играй и получай подарки от СберМегаМаркета.';
export const POST_PHOTO_ID = '-131445697_457296583';

export const PROMOTION_RULES = {
    title: 'Правила акции',
    href: 'https://sbermegamarket.ru/promo/pravila-akczii-megaigra',
};

export const GAME_RULES = {
    title: 'Правила игры',
    href: 'https://docs.google.com/document/d/15JpFeHvjNW7036Bo-e0qJXUfLgE3ggCwFEhD3mVqlTs/edit',
};

export const CONTACTS_HELP = {
    title: 'Свяжись с нами',
    href: 'mailto:smm@sbermegamarket.ru',
    question: 'Нужна помощь?',
};
