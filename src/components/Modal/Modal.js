import classNames from "classnames";
import React, { useState } from "react";
import "./Modal.css";
import closeBtnImage from "../../images/closeBtn.svg";

export const Modal = ({ setGameStatus, gameStatus, result, setResults, time, saveResult }) => {
  const [value, setValue] = useState("");
  const boardResults = JSON.parse(localStorage.getItem("memory-game-results"));
  // boardResults.sort((a, b) => a.time - b.time)
  // console.log(boardResults)

  function submitHandler(evt) {
    evt.preventDefault();
    if (value.trim()) {
      saveResult(value, time);
      setValue('')
      setGameStatus(!gameStatus)
    }
    setResults(!result)

  }

  return (
    <React.Fragment>
      {gameStatus ? (
        <div className={classNames("modal", { open: result })}>
          <form className="modal-body" onSubmit={submitHandler}>
            <img
              onClick={() => setResults(!result)}
              src={closeBtnImage}
              className="modal-close"
            />
            <h1 className="modal-title">Сохранить результат</h1>
            <div className="modal-container">
              <input
                onChange={(evt) => setValue(evt.target.value)}
                value={value}
                placeholder="Введите ваше имя"
                className="modal-input"
                required
              />
              <input
                className="modal-input modal-result"
                disabled
                value={time}
              />
              <button className="modal-submit" type="submit">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={classNames("modal", { open: result })}>
          <form className="modal-body" onSubmit={submitHandler}>
            <img
              onClick={() => setResults(!result)}
              src={closeBtnImage}
              className="modal-close"
            />
            <h1 className="modal-title">Три лучших результата</h1>
            <div className="modal-container">
              <ul className="result-board">
                { localStorage.getItem('memory-game-results') ? boardResults.sort((a, b) => a.time - b.time).slice(0, 3).map((result, index) => {
                  return <li key={index} className="result-item">{result.name}<span>{result.time}</span></li>;
                }) : <p className="no-results">Нет результатов</p>}
              </ul>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};
