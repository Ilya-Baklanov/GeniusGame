import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const Item = ({
  index, style, isItemLoaded, items,
}) => {
  let content;
  if (!isItemLoaded(index)) {
    content = 'Loading...';
  } else {
    content = items[index].name;
  }
  return <div style={style}>{content}</div>;
};

Item.propTypes = {
  index: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  isItemLoaded: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};

const ExampleWrapper = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  children,
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={150}
          itemCount={itemCount}
          itemSize={30}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={300}
        >
          {({ index }) => <Item index={index} isItemLoaded={isItemLoaded} items={items} />}
        </List>
      )}
    </InfiniteLoader>
  );
};

ExampleWrapper.propTypes = {
  hasNextPage: PropTypes.bool,
  isNextPageLoading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  loadNextPage: PropTypes.func,
  children: PropTypes.node,
};

export default ExampleWrapper;
