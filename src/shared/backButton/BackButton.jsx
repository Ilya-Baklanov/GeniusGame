import { IconButton } from "@vkontakte/vkui";
import cn from 'classnames';

import style from "./BackButton.module.css";
import RightArrow from '../../assets/image/right_arrow.svg?react';

export const BackButton = ({onClick, goTo, className}) => (
    <IconButton
    aria-label="Кнопка 'Назад'"
    onClick={onClick}
    className={cn(style["back-button"], className)}
    hasActive={false}
    hasHover={false}
    hoverMode=""
    focusVisibleMode=""
    data-to={goTo}
  >
    <RightArrow width="16px" color="#FFF" />
  </IconButton>
)
