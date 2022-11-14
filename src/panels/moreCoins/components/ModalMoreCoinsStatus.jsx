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
  onClose,
}) => (
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
      <div className={cn(style['more-coins-modal-wrapper'])}>
        <div className={cn(style['more-coins-status-list-wrapper'])}>
          {STATUS_LIST.map(({ img, text }, index) => (
            <CopyToClipboard key={index} text={text}>
              <div
                className={cn(style['more-coins-status-list-item'])}
              >
                <img className={cn(style['more-coins-status-list-item-img'])} src={img} alt={text} />
                <Text className={cn(style['more-coins-status-list-item-text'])}>
                  {text}
                </Text>
              </div>
            </CopyToClipboard>
          ))}
        </div>

        <div className={cn(style['more-coins-navbar-container'])}>
          <Navbar id={activePanelId} />
        </div>
      </div>
    </ModalPage>
  </AppearanceProvider>
);

ModalMoreCoinsStatus.propTypes = {
  id: PropTypes.string.isRequired,
  activePanelId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
};

export default ModalMoreCoinsStatus;
