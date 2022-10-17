import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel, PanelHeader, PanelHeaderBack, Text,
} from '@vkontakte/vkui';

import Navbar from '../navbar/Navbar';
import './CommonPanel.css';
import MainLayout from '../mainLayout/MainLayout';
import { APP_NAME } from '../../assets/constants/constants';
import { MoreCoins } from '../../assets/image';

const CommonPanel = ({
  id, go, title, description, additionalBlock, children, amountCoins,
}) => (
  <Panel id={id}>
    <PanelHeader
      left={<PanelHeaderBack onClick={go} data-to="home" />}
    >
      {APP_NAME}
    </PanelHeader>

    <MainLayout>
      <div className="common-panel-earned">
        <Text className="common-panel-earned-count">
          {amountCoins}
        </Text>
        <MoreCoins />
      </div>
      {title && (
        <div className="common-title-wrapper">
          <Text className="common-title">{title}</Text>
        </div>
      )}
      {description && (
      <div className="common-description-wrapper">
        <Text className="common-description">{description}</Text>
      </div>
      )}
      {additionalBlock && (
        <div className="common-additional-block">
          {additionalBlock}
        </div>
      )}
      {children && (
        <div className="common-children">
          {children}
        </div>
      )}
      <div className="navbar-container">
        <Navbar id={id} go={go} />
      </div>
    </MainLayout>
  </Panel>
);

CommonPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  additionalBlock: PropTypes.node,
  children: PropTypes.node,
  amountCoins: PropTypes.string.isRequired,
};

export default CommonPanel;
