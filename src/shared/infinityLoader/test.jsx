import React, { useState } from 'react';
import ExampleWrapper from './InfinityLoader';

const Test = () => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState([]);

  const loadNextPage = (...args) => {
    setIsNextPageLoading(true);
    setTimeout(() => {
      setHasNextPage(items.length < 100);
      setIsNextPageLoading(false);
      setItems([...items].concat(
        new Array(10).fill(true).map((_, index) => ({ name: `name_${index}` })),
      ));
    }, 2500);
  };

  return (
    <ExampleWrapper
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      items={items}
      loadNextPage={loadNextPage}
    />
  );
};

export default Test;
