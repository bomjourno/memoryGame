import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const Timer = ({ buttonsClass }) => {
  const [time, setSeconds] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const [isActive, setIsActive] = useState(false);

  function start() {
    setIsActive(true);
  }

  function pause() {
    setIsActive(false);
  }

  useEffect(() => {
    let timerId = null;
    if (isActive) {
      timerId = setInterval(() => {
        setSeconds((prev) => {
          if (prev.s < 59) {
            return {
              ...prev,
              s: prev.s + 1,
            };
          } else if (prev.m < 59) {
            return {
              ...prev,
              m: prev.m + 1,
              s: 0,
            };
          }
          return {
            ...prev,
            h: prev.h + 1,
            m: 0,
            s: 0,
          };
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [time, isActive]);

  return (
    <div className="header">

      <Button handleClick={start} button={buttonsClass.start} />
      <Button handleClick={pause} button={buttonsClass.pause} />
      <Button button={buttonsClass.results} />
      <div className="time-container">{`${time.h}:${time.m}:${time.s}`}</div>
    </div>
  );
};

export default Timer;
