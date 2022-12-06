import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
import { CONTACTS_HELP, SBERMEGAMARKET_LINK } from '../../../assets/constants/constants';

const ModalGetPromoCode = ({
  id,
  content,
  onClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);
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
        <div className={cn(style.wrapper)}>
          <CopyToClipboard onCopy={() => setIsCopied(true)} text={content.promocode}>
            <div className={cn(style['promocode-card'])}>
              <Text className={cn(style['promocode-card-description'])}>
                Ваш промокод:
              </Text>
              <Text className={cn(style['promocode-card-text'])}>
                {content.promocode}
              </Text>
            </div>
          </CopyToClipboard>
          <div className={cn(style['description-wrapper'])}>
            <Text className={cn(style['description-text'])}>
              {isCopied ? 'Промокод скопирован.' : ''}
            </Text>
          </div>
          <div className={style['sbermegamarket-button-wrapper']}>
            <Link
              className={style['sbermegamarket-button']}
              target="_blank"
              href={SBERMEGAMARKET_LINK}
            >
              <Text className={style['sbermegamarket-button-text']}>
                За покупками на СберМегаМаркет!
              </Text>
            </Link>
          </div>
          <div className={cn(style.rules)}>
            <Text className={cn(style['rules-question'])}>{CONTACTS_HELP.question}</Text>
            <Link
              className={cn(style['rules-link'])}
              href={CONTACTS_HELP.href}
              target="_blank"
            >
              {CONTACTS_HELP.title}
            </Link>
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
