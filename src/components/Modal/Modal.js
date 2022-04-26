import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./Modal.css";
import closeBtnImage from "../../images/closeBtn.svg";
import { boardResults } from "../../utils/constants";

export const Modal = ({
  gameStatus,
  switchGameWin,
  resultsTable,
  switchShowResultsTable,
  time,
  saveResult,
}) => {
  const [value, setValue] = useState("");


  function submitHandler(evt) {
    evt.preventDefault();
    if (value.trim()) {
      saveResult(value, time);
      setValue("");
      switchGameWin()
    }
    switchShowResultsTable();
  }

  //открываем модалку после победы
  useEffect(() => {
    if (gameStatus) {
      switchShowResultsTable();
    }
  }, [gameStatus]);

  return (
    <React.Fragment>
      {gameStatus ? (
        <div className={classNames("modal", { open: resultsTable })}>
          <form className="modal-body" onSubmit={submitHandler}>
            <img
              onClick={switchShowResultsTable}
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
        <div className={classNames("modal", { open: resultsTable })}>
          <form className="modal-body" onSubmit={submitHandler}>
            <img
              onClick={switchShowResultsTable}
              src={closeBtnImage}
              className="modal-close"
            />
            <h1 className="modal-title">Три лучших результата</h1>
            <div className="modal-container">
              <ul className="result-board">
                {localStorage.getItem("memory-game-results") ? (
                  boardResults
                    .sort((a, b) => a.time - b.time)
                    .slice(0, 3)
                    .map((result, index) => {
                      return (
                        <li key={index} className="result-item">
                          {result.name}
                          <span>{result.time}</span>
                        </li>
                      );
                    })
                ) : (
                  <p className="no-results">Нет результатов</p>
                )}
              </ul>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};
