import React, { useCallback, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Avatar, Text } from '@vkontakte/vkui';

import style from './GamersList.module.css';
import { MoreCoins } from '../../../assets/image';

const GamersList = ({ positionOnRating, gamersOnRating, gamersList }) => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState([]);

  const loadNextPage = (...args) => {
    setIsNextPageLoading(true);
    if (gamersList) {
      setTimeout(() => {
        setHasNextPage(items.length < gamersList.length - 1);
        setIsNextPageLoading(false);
        setItems([...items].concat(
          new Array(10).fill(true).map((_, index) => gamersList[index]),
        ));
      }, 2500);
    }
  };

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  return (
    <div className={cn(style['gamers-list-wrapper'])}>
      <div className={cn(style['position-on-rating-wrapper'])}>
        <Text className={cn(style['position-on-rating-your'])}>
          {`Вы ${positionOnRating}`}
        </Text>
        <Text className={cn(style['position-on-rating-all'])}>
          {`/ ${gamersOnRating}`}
        </Text>
      </div>
      <div className={cn(style['gamers-list-container'])}>
        <div className={cn(style['gamers-list-item-wrapper-first'])}>
          <div className={cn(style['gamers-list-item'])}>
            <div className={cn(style['gamers-list-item-user-info'])}>
              <Avatar src={gamersList[0].avatarSrc} className={cn(style['gamers-list-item-avatar'])} size={54} />
              <div className={cn(style['gamers-list-item-name-wrapper'])}>
                <Text className={cn(style['gamers-list-item-name'])}>
                  {gamersList[0].name}
                </Text>
              </div>
            </div>
            <div className={cn(style['gamers-list-item-score-wrapper'])}>
              <Text className={cn(style['gamers-list-item-score'])}>
                {gamersList[0].score}
              </Text>
              <MoreCoins />
            </div>
          </div>
        </div>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={320}
              itemCount={itemCount}
              itemSize={62}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width="100%"
              itemData={gamersList.filter((item, index) => index !== 0)}
            >
              {({ index, style: defaultStyle, data }) => (
                <div style={defaultStyle} key={index} className={cn(style['gamers-list-item-wrapper'])}>
                  <div className={cn(style['gamers-list-item'])}>
                    <div className={cn(style['gamers-list-item-user-info'])}>
                      <Avatar src={data?.[index]?.avatarSrc} className={cn(style['gamers-list-item-avatar'])} size={54} />
                      <div className={cn(style['gamers-list-item-name-wrapper'])}>
                        <Text className={cn(style['gamers-list-item-name'])}>
                          {data?.[index]?.name}
                        </Text>
                      </div>
                    </div>
                    <div className={cn(style['gamers-list-item-score-wrapper'])}>
                      <Text className={cn(style['gamers-list-item-score'])}>
                        {data?.[index]?.score}
                      </Text>
                      <MoreCoins />
                    </div>
                  </div>
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
        {/* {gamersList && gamersList.map(({ avatarSrc, name, score }, index) => (
          <div key={index} className={cn(style['gamers-list-item-wrapper'])}>
            <div className={cn(style['gamers-list-item'])}>
              <div className={cn(style['gamers-list-item-user-info'])}>
                <Avatar
                src={avatarSrc}
                className={cn(style['gamers-list-item-avatar'])}
                size={54}
                />
                <div className={cn(style['gamers-list-item-name-wrapper'])}>
                  <Text className={cn(style['gamers-list-item-name'])}>
                    {name}
                  </Text>
                </div>
              </div>
              <div className={cn(style['gamers-list-item-score-wrapper'])}>
                <Text className={cn(style['gamers-list-item-score'])}>
                  {score}
                </Text>
                <MoreCoins />
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

GamersList.propTypes = {
  positionOnRating: PropTypes.number,
  gamersOnRating: PropTypes.number,
  gamersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    avatarSrc: PropTypes.string,
  })),
};

export default GamersList;
