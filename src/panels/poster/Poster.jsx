/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton,
} from '@vkontakte/vkui';

import { Close, CloseGray } from '../../assets/image';
import style from './Poster.module.css';
import { APP_NAME, POSTER_PICTURES } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';
import Navbar from '../../shared/navbar/Navbar';
import MainButton from '../../shared/mainButton/MainButton';
import { PanelTypes } from '../../structure';

const Poster = ({
  id, go, onRepost, isMobile,
}) => {
  const [colorizedItems, setColorizedItems] = useState([]);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader
          before={<PanelHeaderBack onClick={go} data-to="moreCoins" />}
        >
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout>
        <div className={cn(style['poster-wrapper'])}>
          <div className={cn(style.top)}>
            <div className={cn(style.header)}>
              <Text className={cn(style.title)}>{'Раскрась и получи\nмонеты'}</Text>
              <IconButton
                aria-label="Крестик для закрытия текущего окна"
                onClick={go}
                data-to={PanelTypes.moreCoins}
                className={cn(style['close-button'])}
                hasActive={false}
                hasHover={false}
                hoverMode=""
                focusVisibleMode=""
              >
                <CloseGray />
              </IconButton>
            </div>
            <div className={cn(style['description-wrapper'])}>
              <Text className={cn(style.description)}>
                {'Жми на элементы, чтобы они обрели цвет.\nПоделись раскрашенным изображением\nс друзьями и получи монеты.'}
              </Text>
            </div>
          </div>
          <div className={cn(style['picture-wrapper'])}>
            {POSTER_PICTURES.map(({
              name, img_w, img_c,
            }, index) => (
              <div
                key={index + name}
                className={cn(style.img_wrapper, style[`${name}-wrapper`])}
                onClick={(e) => {
                  e.stopPropagation();
                  setColorizedItems((prevList) => (prevList.includes(name)
                    ? prevList
                    : [...prevList, name]));
                }}
              >
                {img_w && (
                  <img
                    className={cn(style.img, style.white)}
                    src={img_w}
                    alt={`${name} white`}
                  />
                )}
                {img_c && (
                  <img
                    className={cn(
                      style.img,
                      style.colorized,
                      {
                        [style.active]: colorizedItems.includes(name),
                      },
                    )}
                    src={img_c}
                    alt={`${name} colorized`}
                  />
                )}
              </div>
            ))}
          </div>
          <MainButton
            isFullWidth
            theme="secondary"
            text="Репост в истории"
            onClick={onRepost}
            disabled={colorizedItems.length < POSTER_PICTURES.length}
          />
        </div>
      </MainLayout>
    </Panel>
  );
};

Poster.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  onRepost: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default Poster;
