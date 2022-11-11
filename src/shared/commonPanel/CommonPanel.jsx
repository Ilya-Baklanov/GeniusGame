import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, ScreenSpinner, useAdaptivity, ViewWidth,
} from '@vkontakte/vkui';

import Navbar from '../navbar/Navbar';
import style from './CommonPanel.module.css';
import MainLayout from '../mainLayout/MainLayout';
import { APP_NAME } from '../../assets/constants/constants';
import { MoreCoins } from '../../assets/image';

const CommonPanel = ({
  id, go, title, description, additionalBlock, children, amountCoins, isLoading,
}) => {
  const { viewWidth } = useAdaptivity();

  return (
    <Panel id={id}>
      {viewWidth >= ViewWidth.TABLET && (
        <PanelHeader
          left={<PanelHeaderBack onClick={go} data-to="home" />}
        >
          {APP_NAME}
        </PanelHeader>
      )}
      {isLoading
        ? (<ScreenSpinner size="large" />)
        : (
          <>
            <MainLayout>
              {/* <div className={style['common-panel-wrapper']}> */}
              <div className={cn(style['common-panel-earned'])}>
                <Text className={cn(style['common-panel-earned-count'])}>
                  {amountCoins}
                </Text>
                <MoreCoins />
              </div>
              {title && (
              <div className={cn(style['common-title-wrapper'])}>
                <Text className={cn(style['common-title'])}>{title}</Text>
              </div>
              )}
              {description && (
              <div className={cn(style['common-description-wrapper'])}>
                <Text className={cn(style['common-description'])}>{description}</Text>
              </div>
              )}
              {additionalBlock && (
              <div className={cn(style['common-additional-block'])}>
                {additionalBlock}
              </div>
              )}
              {children && (
              <div className={cn(style['common-children'])}>
                {children}
              </div>
              )}
              {/* </div> */}
            </MainLayout>
            <div className={cn(style['navbar-container'])}>
              <Navbar id={id} go={go} />
            </div>
          </>
        )}
    </Panel>
  );
};

CommonPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  additionalBlock: PropTypes.node,
  children: PropTypes.node,
  amountCoins: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CommonPanel;
