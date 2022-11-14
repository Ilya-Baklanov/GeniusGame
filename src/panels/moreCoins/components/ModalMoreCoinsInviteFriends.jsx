import React from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, ModalPage, ModalPageHeader, IconButton, Text,
} from '@vkontakte/vkui';
import cn from 'classnames';

import style from './ModalMoreCoinsInviteFriends.module.css';
import Navbar from '../../../shared/navbar/Navbar';
import { CloseGray } from '../../../assets/image';

const ModalMoreCoinsInviteFriends = ({
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
        <div className={cn(style['more-coins-invite-friends-wrapper'])}>
          <Text className={cn(style['more-coins-invite-friends-text'])}>
            {'Пригласить к участию друзей можно через три точки (⋮) в верхнем правом углу, если ты играешь с телефона.\nЛибо нажать на «Действия» в верхнем правом углу, если играешь с ПК.'}
          </Text>
        </div>
        <div className={cn(style['more-coins-navbar-container'])}>
          <Navbar id={activePanelId} />
        </div>
      </div>
    </ModalPage>
  </AppearanceProvider>
);

ModalMoreCoinsInviteFriends.propTypes = {
  id: PropTypes.string.isRequired,
  activePanelId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
};

export default ModalMoreCoinsInviteFriends;
