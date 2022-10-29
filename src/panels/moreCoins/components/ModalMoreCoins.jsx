import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, Link, ModalPage, ModalPageHeader, IconButton, Text, useAdaptivity,
} from '@vkontakte/vkui';

import './ModalMoreCoins.css';
import MainButton from '../../../shared/mainButton/MainButton';
import Navbar from '../../../shared/navbar/Navbar';
import { CloseGray } from '../../../assets/image';

const ModalMoreCoins = ({
  id,
  onClose,
  go,
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
        <div className="more-coins-modal-wrapper">
          <div className="more-coins-navbar-container">
            <Navbar id={id} go={go} />
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

ModalMoreCoins.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
  go: PropTypes.func,
};

export default ModalMoreCoins;
