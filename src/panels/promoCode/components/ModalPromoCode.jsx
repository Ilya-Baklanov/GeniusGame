import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  AppearanceProvider,
  Link,
  ModalPage,
  ModalPageHeader,
  Text,
  useAdaptivity,
  IconButton,
} from '@vkontakte/vkui';

import style from './ModalPromoCode.module.css';
import MainButton from '../../../shared/mainButton/MainButton';
import { CloseGray } from '../../../assets/image';
import { GAME_RULES } from '../../../assets/constants/constants';

const ModalPromoCode = ({
  id,
  onClose,
  content,
  amountCoins,
  userId,
  onActiveModalGetPromocode,
  getPromoCode,
}) => {
  const { viewWidth } = useAdaptivity();

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
        return 'Ты можешь забрать этот промокод или продолжить играть, чтобы заработать монеты на промокод ещё большего номинала.';
      case Math.floor(+amountCoins / 100) > content.denomination / 100:
        return 'У тебя есть возможность получить промокод с большим номиналом! Ты можешь забрать его или продолжить играть, чтобы заработать монеты на промокод ещё большего номинала.';
      case Math.floor(+amountCoins / 100) < content.denomination / 100 || amountCoins === '0':
        return 'Пока у тебя недостаточно монет, чтобы получить этот промокод. Продолжай играть, чтобы заработать монеты на промокод!';
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
        // size="l"
        // hideCloseButton
        header={(
          <ModalPageHeader
            right={(
              <IconButton
                hasActive={false}
                hasHover={false}
                hoverMode=""
                focusVisibleMode=""
                onClick={onClose}
              >
                <CloseGray />
              </IconButton>
            )}
          />
      )}
      >
        <div className={cn(style['promocode-modal-wrapper'])}>
          <div className={cn(style['promocode-modal-promocode-card'], {
            [style.availablePromoCode]: availablePromoCode,
          })}
          >
            <Text className={cn(style['promocode-modal-promocode-card-text'], {
              [style.availablePromoCode]: availablePromoCode,
            })}
            >
              {`Промокод на ${content.denomination}₽`}
            </Text>
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
            </Link>
          </div>
          <div className={cn(style['promocode-modal-button-wrapper'])}>
            <MainButton
              text="Получить"
              disabled={!availablePromoCode}
              onClick={() => {
                getPromoCode(userId, `${content.denomination}`).then((promocode) => {
                  onActiveModalGetPromocode(promocode);
                });
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
  userId: PropTypes.number,
  onActiveModalGetPromocode: PropTypes.func,
  getPromoCode: PropTypes.func,
};

export default ModalPromoCode;
