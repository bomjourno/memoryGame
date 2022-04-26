import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { useSwitcher } from "../hooks/useSwitcher";
import { Modal } from "../Modal/Modal";
import { ONE_SECOND_IN_MILLISECONDS, ONE_SECOND } from "../../utils/constants";
import "./Timer.css";

export const Timer = ({
  switchGameWin,
  switchEnableBoard,
  stopWatch,
  start,
  pause,
  gameStatus,
}) => {
  const [time, setTime] = useState(0);
  const [resultsTable, , , switchShowResultsTable] = useSwitcher(false);

  const hours = ("0" + (Math.floor(time / 3600) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);
  const seconds = ("0" + Math.floor(time % 60)).slice(-2);

  useEffect(() => {
    switchEnableBoard();
  }, [stopWatch]);

  useEffect(() => {
    let timerId = null;
    if (stopWatch) {
      timerId = setInterval(() => {
        setTime((time) => time + ONE_SECOND);
      }, ONE_SECOND_IN_MILLISECONDS);
    } else {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [time, stopWatch]);

  function saveResult(name, time) {
    let results = [];
    if (localStorage.getItem("memory-game-results")) {
      results = JSON.parse(localStorage.getItem("memory-game-results"));
    }
    results.push({ name, time });
    localStorage.setItem("memory-game-results", JSON.stringify(results));
    setTime(0);
  }

  //открываем модалку после победы
  useEffect(() => {
    if (gameStatus) {
      switchShowResultsTable();
    }
  }, [gameStatus]);

  return (
    <div className="header">
      <Button gameStatus={gameStatus} handleClick={start} button={"start"} />
      <Button gameStatus={gameStatus} handleClick={pause} button={"pause"} />
      <Button handleClick={switchShowResultsTable} button={"results"} />
      <div className="time-container">
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <Modal
        switchGameWin={switchGameWin}
        gameStatus={gameStatus}
        saveResult={saveResult}
        time={time}
        resultsTable={resultsTable}
        switchShowResultsTable={switchShowResultsTable}
      />
    </div>
  );
};
