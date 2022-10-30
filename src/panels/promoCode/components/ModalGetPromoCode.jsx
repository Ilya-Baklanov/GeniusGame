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

import style from './ModalGetPromoCode.module.css';
import { CloseGray } from '../../../assets/image';

const ModalGetPromoCode = ({
  id,
  content,
  onClose,
}) => {
  const { viewWidth } = useAdaptivity();

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        size="s"
        header={(
          <ModalPageHeader
            right={(
              <IconButton onClick={onClose}>
                <CloseGray />
              </IconButton>
            )}
          />
      )}
      >
        <div className={cn(style.wrapper)}>
          <div className={cn(style['promocode-card'])}>
            <Text className={cn(style['promocode-card-description'])}>
              Ваш промокод:
            </Text>
            <Text className={cn(style['promocode-card-text'])}>
              {content.promocode}
            </Text>
          </div>
          <div className={cn(style['description-wrapper'])}>
            <Text className={cn(style['description-text'])}>
              Текст
            </Text>
          </div>
          <div className={cn(style.rules)}>
            <Text className={cn(style['rules-question'])}>Нужна помощь?</Text>
            <Link className={cn(style['rules-link'])} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Свяжись с нами</Link>
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

ModalGetPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.shape({
    promocode: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ModalGetPromoCode;
