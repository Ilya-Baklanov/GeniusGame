import React, { useCallback } from 'react';
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';

import style from './Card.module.css';

const Card = ({
  item, index, handleClick, disable,
}) => {
  const clickHandler = useCallback(() => handleClick(index), [handleClick]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {item && (
      <div
        className={cn(
          style.card,
          {
            [style.preview]: !!item.stat && item.stat === 'preview',
          },
          {
            [style.checked]: !!item.stat && item.stat !== 'preview',
          },
          {
            [style[item.stat]]: !!item.stat && item.stat !== 'preview',
          },
          {
            [style.disable]: disable,
          },
        )}
        onClick={disable ? null : clickHandler}
      >
        <img src={item.img} alt="" />
      </div>
      )}
    </>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: number,
    img: string,
    stat: string,
  }),
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  disable: PropTypes.bool,
};

export default Card;
