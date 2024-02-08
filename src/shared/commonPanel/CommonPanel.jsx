import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Text,
  ScreenSpinner,
  usePlatform,
} from '@vkontakte/vkui';

import Navbar from '../navbar/Navbar';
import style from './CommonPanel.module.css';
import MainLayout from '../mainLayout/MainLayout';
import { APP_NAME } from '../../assets/constants/constants';
import { MoreCoins } from '../../assets/image';

const CommonPanel = ({
  id,
  go,
  title,
  description,
  children,
  amountCoins,
  isLoading,
  isMobile,
  withScrollbar,
  activeTab,
  button,
}) => {
  const platform = usePlatform();

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
          {APP_NAME}
        </PanelHeader>
      )}
      {isLoading ? (
        <ScreenSpinner size="large" />
      ) : (
        <MainLayout>
          <div
            className={cn(style['common-panel-main'], {
              [style['with-scrollbar']]: withScrollbar,
            })}
          >
            <div className={cn(style['common-header'])}>
              {title && (
                <Text className={cn(style['common-title'])}>{title}</Text>
              )}
              {description && (
                <Text className={cn(style['common-description'])}>
                  {description}
                </Text>
              )}
              <div className={cn(style['common-action-container'])}>
                {button && (
                <div
                  className={cn(style['common-button'], {
                    [style['without-description']]:
                    !description,
                  })}
                >
                  {button}
                </div>
                )}
                <div className={cn(style['common-panel-earned'])}>
                  <MoreCoins />
                  <Text className={cn(style['common-panel-earned-count'])}>
                    {amountCoins}
                  </Text>
                  <Text className={cn(style['common-panel-earned-count_text'])}>
                    балла/ов
                  </Text>
                </div>
              </div>
            </div>
            {children && (
            <div
              className={cn(style['common-children'], {
                [style['without-description']]:
                    !description,
              })}
            >
              {children}
            </div>
            )}
          </div>
          <div className={cn(style['navbar-container'], style[platform])}>
            <Navbar id={activeTab || id} go={go} />
          </div>
        </MainLayout>
      )}
    </Panel>
  );
};

CommonPanel.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  amountCoins: PropTypes.string,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  withScrollbar: PropTypes.bool,
  activeTab: PropTypes.string,
  button: PropTypes.node,
};

export default CommonPanel;
