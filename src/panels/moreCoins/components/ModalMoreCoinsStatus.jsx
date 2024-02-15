import React from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, ModalPage, ModalPageHeader, IconButton, Text, useAdaptivity,
} from '@vkontakte/vkui';
import cn from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import style from './ModalMoreCoinsStatus.module.css';
import Navbar from '../../../shared/navbar/Navbar';
import { CloseGray } from '../../../assets/image';
import { STATUS_LIST } from '../../../assets/constants/constants';

const ModalMoreCoinsStatus = ({
  id,
  activePanelId,
  content,
  onClose,
  onSelect,
  platform,
}) => (
  <AppearanceProvider appearance="light">
    <ModalPage
      id={id}
      onClose={onClose}
      size={platform === 'vkcom' && 400}
      hideCloseButton
    >
      <div className={cn(style['more-coins-modal-wrapper'], style[platform])}>
        <div className={style.title_wrapper}>
          <Text className={style.title}>
            Подбери статус
          </Text>
        </div>
        <div className={cn(style['more-coins-status-list-wrapper'])}>
          {STATUS_LIST.map(({ statusId, img, text }, index) => (
            <div
              key={index}
              onClick={() => onSelect(statusId)}
              className={cn(style['more-coins-status-list-item'], { [style.blurred]: !!content.statusId && content.statusId !== statusId })}
            >
              {content.statusId === statusId
                && (
                <div
                  className={cn(style['more-coins-status-list-item-active-background'])}
                />
                )}
              <img className={cn(style['more-coins-status-list-item-img'])} src={img} alt={text} />
              <Text className={cn(
                style['more-coins-status-list-item-text'],
                { [style['item-text-active']]: content.statusId === statusId },
              )}
              >
                {text}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </ModalPage>
  </AppearanceProvider>
);

ModalMoreCoinsStatus.propTypes = {
  id: PropTypes.string.isRequired,
  activePanelId: PropTypes.string,
  content: PropTypes.shape({
    statusId: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  platform: PropTypes.string,
};

export default ModalMoreCoinsStatus;
