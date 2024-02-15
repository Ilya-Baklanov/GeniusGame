import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { CloseGray, RightArrow } from '../../../assets/image';
import { CONTACTS_HELP, SBERMEGAMARKET_LINK } from '../../../assets/constants/constants';

const ModalGetPromoCode = ({
  id,
  content,
  onClose,
  platform,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { viewWidth } = useAdaptivity();

  useLayoutEffect(() => {
    // Костыль для копирования текста при загрузке страницы в iframe
    const inp = document.createElement('input');
    inp.value = content.promocode;
    document.body.appendChild(inp);
    inp.select();

    if (document.execCommand('copy')) {
      setIsCopied(true);
    } else {
      navigator.clipboard.writeText(content.promocode)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error('Не удалось скопировать промокод. ', err);
        });
    }
  }, []);

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        height="100%"
        size={platform === 'vkcom' && 400}
        hideCloseButton
      >
        <div className={cn(style.wrapper)}>
          <div className={cn(style['promocode-modal-content'])}>
            <div className={cn(style['promocode-card_wrapper'])}>
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
            <div className={cn(style['description-wrapper'])}>
              <Text className={cn(style['description-text'])}>
                {isCopied ? 'Промокод скопирован.' : ''}
              </Text>
            </div>
          </div>
          <div className={cn(style['promocode-modal-actions'])}>
            <div className={style['sbermegamarket-button-wrapper']}>
              <a
                className={style['sbermegamarket-button']}
                target="_blank"
                href={SBERMEGAMARKET_LINK}
                rel="noreferrer"
              >
                <Text className={style['sbermegamarket-button-text']}>
                  За покупками на СберМегаМаркет!
                </Text>
              </a>
            </div>
            <div className={cn(style.rules)}>
              <Text className={cn(style['rules-question'])}>{CONTACTS_HELP.question}</Text>
              <Link
                className={cn(style['rules-link'])}
                href={CONTACTS_HELP.href}
                target="_blank"
              >
                {CONTACTS_HELP.title}
                <RightArrow />
              </Link>
            </div>
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
  platform: PropTypes.string,
};

export default ModalGetPromoCode;
