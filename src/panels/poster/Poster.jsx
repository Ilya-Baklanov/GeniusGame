/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Panel, PanelHeader, PanelHeaderBack, Text, IconButton,
} from '@vkontakte/vkui';

import { Close } from '../../assets/image';
import style from './Poster.module.css';
import { APP_NAME, POSTER_PICTURES } from '../../assets/constants/constants';
import MainLayout from '../../shared/mainLayout/MainLayout';
import Navbar from '../../shared/navbar/Navbar';
import MainButton from '../../shared/mainButton/MainButton';

const Poster = ({
  id, go, onRepost, isMobile,
}) => {
  const [colorizedItems, setColorizedItems] = useState([]);

  return (
    <Panel id={id}>
      {!isMobile && (
        <PanelHeader
          left={<PanelHeaderBack onClick={go} data-to="moreCoins" />}
        >
          {APP_NAME}
        </PanelHeader>
      )}
      <MainLayout>
        <div className={cn(style['poster-wrapper'])}>
          <div className={cn(style.header)}>
            <div className={cn(style['close-button-wrapper'])}>
              <IconButton
                onClick={go}
                data-to="moreCoins"
                className={cn(style['close-button'])}
                hasActive={false}
                hasHover={false}
                hoverMode=""
                focusVisibleMode=""
              >
                <Close />
              </IconButton>
            </div>
          </div>
          <div className={cn(style['title-wrapper'])}>
            <Text className={cn(style.title)}>Раскрась и получи монеты</Text>
          </div>
          <div className={cn(style['description-wrapper'])}>
            <Text className={cn(style.description)}>
              {'Жми на элементы, чтобы они обрели цвет.\nПоделись раскрашенным изображением\nс друзьями и получи монеты.'}
            </Text>
          </div>
          <div className={cn(style['picture-wrapper'])}>
            <div
              className={cn(style['picture-background'], { [style['background-colorized']]: colorizedItems.includes('background') })}
              onClick={(e) => {
                e.stopPropagation();
                setColorizedItems((prevList) => [...prevList, 'background']);
              }}
            >
              {POSTER_PICTURES.map(({
                name, img_w, img_c, img,
              }, index) => {
                switch (name) {
                  case 'phone':
                    return (
                      <div className={cn(style[`${name}-wrapper`])}>
                        <img className={cn(style[name])} src={img} alt={name} />
                      </div>
                    );
                  case 'logo':
                    return (
                      <div className={cn(style[`${name}-wrapper`])}>
                        <img
                          className={cn(style[name])}
                          src={colorizedItems.includes('background') ? img_w : img_c}
                          alt={name}
                        />
                      </div>
                    );
                  default:
                    return (
                      <div
                        key={index + name}
                        className={cn(style[`${name}-wrapper`])}
                        onClick={(e) => {
                          e.stopPropagation();
                          setColorizedItems((prevList) => [...prevList, name]);
                        }}
                      >
                        <img
                          className={cn(style[name], style.white, style)}
                          src={img_w}
                          alt={`${name} white`}
                        />
                        <img
                          className={cn(
                            style[name],
                            style.colorized,
                            {
                              [style.active]: colorizedItems.includes(name),
                            },
                            style.img,
                          )}
                          src={img_c}
                          alt={`${name} colorized`}
                        />
                      </div>
                    );
                }
              })}
            </div>
          </div>
          <div className={cn(style['repost-button-wrapper'])}>
            <MainButton text="Репост" onClick={onRepost} disabled={colorizedItems.length < 7} />
          </div>
          <div className={cn(style['navbar-container'])}>
            <Navbar id={id} go={go} />
          </div>
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
