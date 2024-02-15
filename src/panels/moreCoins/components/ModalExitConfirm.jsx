import React from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, ModalPage, ModalPageHeader, IconButton, Text,
} from '@vkontakte/vkui';
import cn from 'classnames';

import style from './ModalExitConfirm.module.css';
import Navbar from '../../../shared/navbar/Navbar';
import { CloseGray } from '../../../assets/image';

const ModalExitConfirm = ({
  id,
  onClose,
  onConfirm,
}) => (
  <AppearanceProvider appearance="light">
    <ModalPage
      id={id}
      onClose={onClose}
      size={350}
      header={(
        <ModalPageHeader>
          Вы точно хотите выйти из игры?
        </ModalPageHeader>
      )}
      hideCloseButton
    >
      <div className={cn(style['buttons-wrapper'])}>
        <button
          type="button"
          onClick={onConfirm}
          className={style.button}
        >
          <Text className={style.button_yes_text}>Да</Text>
        </button>
        <button
          type="button"
          onClick={onClose}
          className={style.button}
        >
          <Text className={style.button_no_text}>Нет</Text>
        </button>
      </div>
    </ModalPage>
  </AppearanceProvider>
);

ModalExitConfirm.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ModalExitConfirm;
