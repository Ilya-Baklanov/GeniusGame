import React, { useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  AppearanceProvider,
  Link,
  ModalPage,
  Text,
  IconButton,
} from "@vkontakte/vkui";

import style from "./ModalPromoCode.module.css";
import MainButton from "../../../shared/mainButton/MainButton";
import AlertIcon from "../../../assets/image/alert_icon.svg?react";
import MoreCoins from "../../../assets/image/moreCoins.svg?react";
import RightArrow from "../../../assets/image/right_arrow.svg?react";
import { CONTACTS_HELP, GAME_RULES } from "../../../assets/constants/constants";
import { BackButton } from "../../../shared/backButton/BackButton";
import { stringEndFormatterByPoints } from "../../../shared/helpers/stringEndFormatterByPoints";

const ModalPromoCode = ({
  id,
  onClose,
  content,
  amountCoins,
  fetchedUser,
  onActiveModalGetPromocode,
  getPromoCode,
  getUserPromoCodes,
  platform,
}) => {
  const availablePromoCode = useMemo(
    () =>
      +amountCoins >= 1100
        ? Math.floor(+amountCoins / 100) > content.denomination / 100 &&
          content.denomination / 100 === 10
        : Math.floor(+amountCoins / 100) === content.denomination / 100,
    [amountCoins, content]
  );

  const isManyPoints = useMemo(() => Math.floor(+amountCoins / 100) > content.denomination / 100, [amountCoins, content.denomination]);
  const isFewPoints = useMemo(() => Math.floor(+amountCoins / 100) < content.denomination / 100 ||
  amountCoins === "0", [amountCoins, content.denomination]);

  const alertText = useMemo(() => {
    if (!amountCoins || !content) {
      return null;
    }
    switch (true) {
      case isManyPoints:
        return {
          title: "Слишком много баллов",
          description:
            "Этот промокод недостаточно классный для вас, заберите более выгодный*",
        };
      case isFewPoints:
        return {
          title: "Не хватает баллов",
          description:
            "Чтобы получить этот промокод. Продолжайте играть и совсем скоро\nвы сможете воспользоваться этим выгодным предложением!",
        };
      default:
        return null;
    }
  }, [amountCoins, content, isManyPoints, isFewPoints]);

  const availablePromoCodeDescription =
    "Вам доступен промокод, который вы можете забрать сейчас и потратить монеты. Либо продолжайте играть, чтобы получить промокод ещё большего номинала.";

  return (
    <AppearanceProvider appearance="light">
      <ModalPage
        id={id}
        onClose={onClose}
        settlingHeight={100}
        height="100%"
        size={platform === "vkcom" && 400}
        hideCloseButton
      >
        <div className={cn(style["promocode-modal-wrapper"])}>
          <div className={cn(style["promocode-modal-content"])}>
            <div
              className={cn(style["promocode-modal-promocode-card"], {
                [style.availablePromoCode]: availablePromoCode,
              })}
            >
              <BackButton onClick={onClose} className={style["close-button"]} />
              <Text
                className={cn(style["promocode-modal-promocode-card-title"], {
                  [style.availablePromoCode]: availablePromoCode,
                })}
              >
                {`Промокод\nна ${content.denomination}₽`}
              </Text>
              <Text
                className={cn(
                  style["promocode-modal-promocode-card-description"],
                  {
                    [style.availablePromoCode]: availablePromoCode,
                  }
                )}
              >
                {content.promoCodeDescription}
              </Text>
            </div>

            {alertText && (
              <div className={style.alert_wrapper}>
                <AlertIcon width="35px" height="32px" />
                <div className={style.alert_content}>
                  <Text className={style.alert_title}>{alertText.title}</Text>
                  <Text className={style.alert_description}>
                    {alertText.description}
                  </Text>
                </div>
              </div>
            )}

            <div className={style.balance}>
              <Text className={style.balance_title}>Мой баланс:</Text>
              <div className={style.balance_value}>
                <MoreCoins />
                <Text className={cn(style.balance_value_count)}>
                  {amountCoins}
                </Text>
                <Text className={cn(style.balance_value_count_text)}>
                  {stringEndFormatterByPoints(amountCoins)}
                </Text>
              </div>
            </div>

            {availablePromoCode && (
              <div className={cn(style["promocode-modal-description-wrapper"])}>
                <Text className={cn(style["promocode-modal-description-text"])}>
                  {availablePromoCodeDescription}
                </Text>
              </div>
            )}

            <div className={cn(style["promocode-modal-rules"])}>
              <Link
                className={cn(style["promocode-modal-rules-link"])}
                target="_blank"
                href={GAME_RULES.href}
              >
                {GAME_RULES.title}
                <RightArrow />
              </Link>
            </div>
          </div>

          <div className={style.footer}>
            {isManyPoints && <div className={style.many_points_explanation_wrapper}>
              <Text className={style.many_points_explanation_text}>
                {"*Как только начинается новая сотня баллов, мы\nавтоматически рекомендуем вам следующий промокод,\nзакрывая предыдущий"}
              </Text>
            </div>}

            <div className={cn(style["promocode-modal-button-wrapper"])}>
              <MainButton
                isFullWidth
                theme="secondary"
                text="Получить"
                disabled={!availablePromoCode}
                onClick={async () => {
                  const promocode = await getPromoCode(
                    fetchedUser.id,
                    `${content.denomination}`
                  );

                  onActiveModalGetPromocode(promocode);

                  await getUserPromoCodes(fetchedUser);
                }}
              />
            </div>

            <div className={cn(style.rules)}>
              <Text className={cn(style["rules-question"])}>
                {CONTACTS_HELP.question}
              </Text>
              <Link
                className={cn(style["rules-link"])}
                href={CONTACTS_HELP.href}
                target="_blank"
              >
                {CONTACTS_HELP.title}
                <RightArrow />
              </Link>
            </div>
          </div>
        </div>
      </ModalPage>
    </AppearanceProvider>
  );
};

ModalPromoCode.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.shape({
    denomination: PropTypes.number,
    promoCodeDescription: PropTypes.string,
  }),
  amountCoins: PropTypes.string,
  fetchedUser: PropTypes.shape({
    id: PropTypes.number,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  onActiveModalGetPromocode: PropTypes.func,
  getPromoCode: PropTypes.func,
  getUserPromoCodes: PropTypes.func,
  platform: PropTypes.string,
};

export default ModalPromoCode;
