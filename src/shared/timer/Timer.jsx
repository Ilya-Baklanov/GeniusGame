import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Text } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const addZero = (number) => (number > 9 ? number : `0${number}`);

export const timeHandler = (time) => {
  const timeItems = time.split(':');
  const hours = +timeItems[0];
  const minutes = +timeItems[1];
  const seconds = +timeItems[2];

  const allSeconds = (seconds + minutes * 60 + hours * 3600);

  return {
    hours,
    allSeconds,
  };
};

/**
 *
 * @param time время таймера в секундах
 * @param advanceСountdownTime время предварительного отсчёта в секундах
 * @param onEndedAdvanceСountdownTime событие, которое выполнится по окончании обратного отсчёта
 * @param onEndedTime событие, которое выполнится по окончании таймера
 * @param className класснейм для задания стилей
 * @returns
 */
const Timer = ({
  time, advanceСountdownTime, onEndedAdvanceСountdownTime, onEndedTime, className,
}) => {
  const [timeLeft, setTimeLeft] = useState(advanceСountdownTime || time);
  const [mainTimeOver, setMainTimeOver] = useState(false);
  const [isAdvanceTimeOver, setIsAdvanceTimeOver] = useState(!advanceСountdownTime);
  const hoursLeft = useMemo(() => Math.trunc((timeLeft / 3600) % 60), [timeLeft]);
  const minutesLeft = useMemo(() => Math.trunc((timeLeft / 60) % 60), [timeLeft]);
  const secondsLeft = useMemo(() => Math.trunc(timeLeft % 60), [timeLeft]);

  const setMainTime = useCallback(() => {
    setIsAdvanceTimeOver(true);
    setTimeLeft(time);
  }, [time]);

  useEffect(() => {
    let timerId;

    if (!mainTimeOver) {
      timerId = setInterval(() => {
        setTimeLeft((previousTimeLeft) => {
          if (previousTimeLeft === 1) {
            clearInterval(timerId);
          }
          return previousTimeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [mainTimeOver, isAdvanceTimeOver]);

  useEffect(() => {
    let timeoutId;

    if (timeLeft === 0) {
      if (!isAdvanceTimeOver) {
        onEndedAdvanceСountdownTime?.();
        setMainTime();
      } else {
        setMainTimeOver(true);
        timeoutId = onEndedTime?.();
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeLeft, isAdvanceTimeOver]);

  return (
    <Text className={className}>
      {advanceСountdownTime && !isAdvanceTimeOver ? `${secondsLeft}` : `${hoursLeft ? `${addZero(hoursLeft)} : ` : ''}${addZero(minutesLeft)} : ${addZero(secondsLeft)}`}
    </Text>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  advanceСountdownTime: PropTypes.number,
  onEndedAdvanceСountdownTime: PropTypes.func,
  onEndedTime: PropTypes.func,
  className: PropTypes.string,
};

export default Timer;
