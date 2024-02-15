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
  platform,
}) => (
  <AppearanceProvider appearance="light">
    <ModalPage
      id={id}
      onClose={onClose}
      // height="100%"
      size={platform === 'vkcom' && 400}
      hideCloseButton
      header={(
        <ModalPageHeader
          right={(
            <IconButton
              aria-label="Крестик для закрытия текущего окна"
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
            Пригласить к участию друзей можно через три точки (…), либо нажать на «Действия».
          </Text>
        </div>
        {/* <div className={cn(style['more-coins-navbar-container'])}>
          <Navbar id={activePanelId} />
        </div> */}
      </div>
    </ModalPage>
  </AppearanceProvider>
);

ModalMoreCoinsInviteFriends.propTypes = {
  id: PropTypes.string.isRequired,
  activePanelId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  platform: PropTypes.string,
};

export default ModalMoreCoinsInviteFriends;
