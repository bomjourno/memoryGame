import React, { useState, useEffect } from "react";
import {Button} from "../Button/Button";
import {Modal} from "../Modal/Modal";
import './Timer.css'

export const Timer = ({setGameStatus, boardStatusSwitcher, stopWatch, start, pause, gameStatus }) => {
  const [time, setTime] = useState(0);
  const ONE_SECOND = 1;
  const ONE_SECOND_IN_MILLISECONDS = 1000

  useEffect(() => {
    boardStatusSwitcher();
  }, [stopWatch])

  useEffect(() => {
    let timerId = null;
    if(stopWatch) {
      timerId = setInterval(() => {
        setTime(time => time + ONE_SECOND)
      }, ONE_SECOND_IN_MILLISECONDS)
    } else {
      clearInterval(timerId)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [time, stopWatch]);

  //сохраняем результат
  useEffect(() => {
    if(gameStatus) {
      // localStorage.setItem(`result№${date.getSeconds()}`, time.toString())
      setResults(!results)
      // setTime(0)
    }
  }, [gameStatus])

  const [results, setResults] = useState(false)

  function showResults() {
    setResults(!results)
  }

  function saveResult (name, time) {
    let results = [];
    if(localStorage.getItem('memory-game-results')) {
      results = JSON.parse(localStorage.getItem('memory-game-results'))
    }
    results.push({name, time})
    localStorage.setItem('memory-game-results', JSON.stringify(results))
    setTime(0)
  }

  return (
    <div className="header">
      <Button gameStatus={gameStatus} handleClick={start} button={'start'} />
      <Button gameStatus={gameStatus} handleClick={pause} button={'pause'} />
      <Button handleClick={showResults} button={'results'} />
      <div className="time-container">
        <span>{("0" + (Math.floor(time / 3600) % 60)).slice(-2)}</span>:
        <span>{("0" + (Math.floor(time / 60) % 60)).slice(-2)}</span>:
        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
      </div>
      <Modal setGameStatus={setGameStatus} gameStatus={gameStatus} saveResult={saveResult} time={time} result={results} setResults={setResults}/>
    </div>
  );
};
