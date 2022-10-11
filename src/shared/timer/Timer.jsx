import React, {
  useCallback,
  useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

const addZero = (number) => (number > 9 ? number : `0${number}`);

/**
 *
 * @param time время таймера в секундах
 * @param advanceСountdownTime время предварительного отсчёта в секундах
 * @param onEndedAdvanceСountdownTime событие, которое выполнится по окончании обратного отсчёта
 * @param onEndedTime событие, которое выполнится по окончании таймера
 * @returns
 */
const Timer = ({
  time, advanceСountdownTime, onEndedAdvanceСountdownTime, onEndedTime,
}) => {
  const [timeLeft, setTimeLeft] = useState(advanceСountdownTime);
  const [isAdvanceTimeOver, setIsAdvanceTimeOver] = useState(false);
  const minutesLeft = useMemo(() => Math.trunc((timeLeft / 60) % 60), [timeLeft]);
  const secondsLeft = useMemo(() => Math.trunc(timeLeft % 60), [timeLeft]);

  const setMainTime = useCallback(() => {
    setIsAdvanceTimeOver(true);
    setTimeLeft(time);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft === 0) {
          clearInterval(timerId);
          return previousTimeLeft;
        }
        return previousTimeLeft - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      if (!isAdvanceTimeOver) {
        onEndedAdvanceСountdownTime();
        setMainTime();
      } else {
        onEndedTime();
      }
    }
  }, [timeLeft, isAdvanceTimeOver]);

  return (
    <div>
      {advanceСountdownTime && !isAdvanceTimeOver ? `${secondsLeft}...` : `${addZero(minutesLeft)} : ${addZero(secondsLeft)}`}
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  advanceСountdownTime: PropTypes.number,
  onEndedAdvanceСountdownTime: PropTypes.func,
  onEndedTime: PropTypes.func,
};

export default Timer;
