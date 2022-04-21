import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import useSwitcher from "../hooks/useSwitcher";
import './Timer.css'

const Timer = ({ buttonsClass }) => {
  const [time, setTime] = useState(0);
  const [isActive, start, pause] = useSwitcher(false)

  useEffect(() => {
    let timerId = null;
    if(isActive) {
      timerId = setInterval(() => {
        setTime(time => time+1)
      }, 1000)
    } else {
      clearInterval(timerId)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [time, isActive]);

  return (
    <div className="header">
      <Button handleClick={start} button={buttonsClass.start} />
      <Button handleClick={pause} button={buttonsClass.pause} />
      <Button button={buttonsClass.results} />
      <div className="time-container">
        <span>{("0" + (Math.floor(time / 3600) % 60)).slice(-2)}</span>:
        <span>{("0" + (Math.floor(time / 60) % 60)).slice(-2)}</span>:
        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default Timer;
