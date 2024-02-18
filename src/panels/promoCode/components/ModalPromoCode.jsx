import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  AppearanceProvider,
  Link,
  ModalPage,
  Text,
  IconButton,
} from '@vkontakte/vkui';

import style from './ModalPromoCode.module.css';
import MainButton from '../../../shared/mainButton/MainButton';
import { CloseGray, RightArrow } from '../../../assets/image';
import { GAME_RULES } from '../../../assets/constants/constants';

const ModalPromoCode = ({
  id,
  onClose,
  content,
  amountCoins,
  fetchedUser,
  onActiveModalGetPromocode,
  getPromoCode,
  getUserPromoCodes,
  platform,
}) => {
  const availablePromoCode = useMemo(
    () => (+amountCoins >= 1100
      ? ((Math.floor(+amountCoins / 100) > content.denomination / 100)
        && ((content.denomination / 100) === 10))
      : Math.floor(+amountCoins / 100) === content.denomination / 100),
    [amountCoins, content],
  );
  const description = useMemo(() => {
    if (!amountCoins || !content) {
      return '';
    }
    switch (true) {
      case availablePromoCode:
        return 'Вам доступен промокод, который вы можете забрать сейчас и потратить монеты. Либо продолжайте играть, чтобы получить промокод ещё большего номинала.';
      case Math.floor(+amountCoins / 100) > content.denomination / 100:
        return 'У вас есть шанс получить еще более выгодный промокод! Для этого можете продолжить играть и зарабатывать монеты. Либо потратить монеты сейчас и забрать этот промокод.';
      case Math.floor(+amountCoins / 100) < content.denomination / 100 || amountCoins === '0':
        return 'Сейчас у вас не хватает монет, чтобы получить этот промокод. Продолжайте играть и совсем скоро вы сможете воспользоваться этим выгодным предложением!';
      default:
        return '';
    }
  }, [amountCoins, content]);

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        settlingHeight={100}
        height="100%"
        size={platform === 'vkcom' && 400}
        hideCloseButton
      >
        <div className={cn(style['promocode-modal-wrapper'])}>
          <div className={cn(style['promocode-modal-content'])}>
            <div className={cn(style['promocode-modal-promocode-card'], {
              [style.availablePromoCode]: availablePromoCode,
            })}
            >
              <div className={style['promocode-modal-promocode-card-header']}>
                <Text className={cn(style['promocode-modal-promocode-card-title'], {
                  [style.availablePromoCode]: availablePromoCode,
                })}
                >
                  {`Промокод\nна ${content.denomination}₽`}
                </Text>
                <IconButton
                  aria-label="Крестик для закрытия текущего окна"
                  hasActive={false}
                  hasHover={false}
                  hoverMode=""
                  focusVisibleMode=""
                  onClick={onClose}
                  className={style['close-button']}
                >
                  <CloseGray />
                </IconButton>
              </div>
              <Text className={cn(style['promocode-modal-promocode-card-description'], {
                [style.availablePromoCode]: availablePromoCode,
              })}
              >
                {content.promoCodeDescription}
              </Text>
            </div>
            <div className={cn(style['promocode-modal-description-wrapper'])}>
              <Text className={cn(style['promocode-modal-description-text'])}>
                {description}
              </Text>
            </div>
            <div className={cn(style['promocode-modal-rules'])}>
              <Link
                className={cn(style['promocode-modal-rules-link'])}
                target="_blank"
                href={GAME_RULES.href}
              >
                {GAME_RULES.title}
                <RightArrow />
              </Link>
            </div>
          </div>
          <div className={cn(style['promocode-modal-button-wrapper'])}>
            <MainButton
              isFullWidth
              theme="secondary"
              text="Получить"
              disabled={!availablePromoCode}
              onClick={async () => {
                const promocode = await getPromoCode(fetchedUser.id, `${content.denomination}`);

                onActiveModalGetPromocode(promocode);

                await getUserPromoCodes(fetchedUser);
              }}
            />
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

ModalPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
  amountCoins: PropTypes.string,
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  onActiveModalGetPromocode: PropTypes.func,
  getPromoCode: PropTypes.func,
  getUserPromoCodes: PropTypes.func,
  platform: PropTypes.string,
};

export default ModalPromoCode;
