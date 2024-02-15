import React, { useCallback } from 'react';
import PropTypes, { number, string } from 'prop-types';
import cn from 'classnames';

import style from './Card.module.css';

const Card = ({
  item, index, handleClick, disable,
}) => {
  if (!item) return null;

  const clickHandler = useCallback(() => handleClick(index), [handleClick]);

  return item && (
  <div
    className={cn(
      style.card,
      {
        [style[item.stat]]: !!item.stat,
      },
    )}
    onClick={disable ? null : clickHandler}
  >
    <div className={style['card-img_wrapper']}>
      <img className={style['card-img']} src={item.img} alt="" />
    </div>
    <div className={style.back} />
  </div>
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
