import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { Link, ScreenSpinner, Text } from "@vkontakte/vkui";

import MoreCoins from "../../assets/image/moreCoins.svg?react";
import CommonPanel from "../../shared/commonPanel/CommonPanel";
import PromoCodeCards from "./components/PromoCodeCards";
import style from "./PromoCode.module.css";
import Switcher from "./components/Switcher";
import CopyToClipboard from "react-copy-to-clipboard";
import { stringEndFormatterByPoints } from "../../shared/helpers/stringEndFormatterByPoints";
import RightArrow from "../../assets/image/right_arrow.svg?react";
import { GAME_RULES, PROMOCODES, PROMOTION_RULES } from "../../assets/constants/constants";

const PromoCode = ({
  id,
  go,
  amountCoins,
  onActivateModal,
  isLoading,
  isMobile,
  promocodesList,
}) => {
  const [isAllPromoCodes, setIsAllPromoCodes] = useState(true);
  const [isCopied, setIsCopied] = useState(null);

  const promoCodesSwitcherHandler = useCallback((e) => {
    setIsAllPromoCodes(!e.target.checked);
  }, []);

  return (
    <CommonPanel
      id={id}
      go={go}
      amountCoins={amountCoins}
      title="Промокоды"
      description={
        "Обменивай монеты на промокоды\nи совершай покупки на Мегамаркете!"
      }
      isLoading={isLoading}
      isMobile={isMobile}
      withScrollbar
    >
      <div className={style.switcher_wrapper}>
        <Switcher
          onToggle={promoCodesSwitcherHandler}
          checked={!isAllPromoCodes}
        />
        <div className={cn(style["earned"])}>
          <MoreCoins />
          <Text className={cn(style["earned-count"])}>{amountCoins}</Text>
          <Text className={cn(style["earned-count_text"])}>
            {stringEndFormatterByPoints(amountCoins)}
          </Text>
        </div>
      </div>
      {isAllPromoCodes ? (
        <PromoCodeCards
          amountCoins={amountCoins}
          onActivateModal={onActivateModal}
        />
      ) : promocodesList ? (
        <div className={style.wrapper}>
          {[
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
            ...promocodesList,
          ].map(({ promo, price }, index) => (
            <CopyToClipboard
              key={index}
              onCopy={() => setIsCopied(promo)}
              text={promo}
            >
              <div className={style["promocode-wrapper"]}>
                <div className={style.promocode}>
                <Text className={style["promocode-price"]}>{`${price}₽`}</Text>
                <Text className={style["promocode-name"]}>{promo}</Text>
                {/* {isCopied === promo && (
                  <Text className={style["promocode-copied"]}>
                    {"Промокод скопирован."}
                  </Text>
                )} */}
                </div>

                <div className={style.promocode_condition_wrapper}>
                  <Text className={style.promocode_condition_text}>{PROMOCODES.find(({denomination}) => denomination === +price)?.condition}</Text>
                </div>
              </div>
            </CopyToClipboard>
          ))}

          <div className={cn(style["promocode-rules"])}>
            <Link
              className={cn(style["promocode-rules-link"])}
              target="_blank"
              href={GAME_RULES.href}
            >
              {GAME_RULES.title}
              <RightArrow />
            </Link>
            <Link
              className={cn(style["promocode-rules-link"])}
              target="_blank"
              href={PROMOTION_RULES.href}
            >
              {PROMOTION_RULES.title}
              <RightArrow />
            </Link>
          </div>
        </div>
      ) : (
        <ScreenSpinner size="large" />
      )}
    </CommonPanel>
  );
};

PromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  amountCoins: PropTypes.string.isRequired,
  onActivateModal: PropTypes.func,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  promocodesList: PropTypes.array,
};

export default PromoCode;
