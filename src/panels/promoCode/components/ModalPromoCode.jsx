import React from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceProvider, Link, ModalPage, ModalPageHeader, PanelHeaderClose, Text, useAdaptivity,
} from '@vkontakte/vkui';

import './ModalPromoCode.css';
import MainButton from '../../../shared/mainButton/MainButton';

const ModalPromoCode = ({ id, onClose }) => {
  const { viewWidth } = useAdaptivity();
  const [expanded, setExpanded] = React.useState(false);
  const toggle = React.useCallback(() => setExpanded(!expanded), [expanded]);

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        size="s"
        header={(
          <ModalPageHeader
            after={
              <PanelHeaderClose onClick={onClose} />
              }
          />
      )}
      >
        <div className="promocode-modal-wrapper">
          <div className="promocode-modal-promocode-card">
            <Text className="promocode-modal-promocode-card-text">
              Промокод на 200₽
            </Text>
            <Text className="promocode-modal-promocode-card-description">
              Можно использовать при заказе от 700₽
            </Text>
          </div>
          <div className="promocode-modal-description-wrapper">
            <Text className="promocode-modal-description-text">
              У тебя есть возможность получить промокод с большим номиналом!
              Ты можешь забрать его или продолжить играть, чтобы заработать монеты
              на промокод ещё большего номинала.
            </Text>
          </div>
          <div className="promocode-modal-rules">
            <Link className="promocode-modal-rules-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Правила игры</Link>
          </div>
          <div className="promocode-modal-button-wrapper">
            <MainButton
              text="Получить"
              onClick={() => console.log('HOBBA')}
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
};

export default ModalPromoCode;
