import classNames from "classnames";
import React from "react";
import "./Button.css";

export function Button({gameStatus, handleClick, button}) {
  return <button onClick={handleClick} type="button" className={classNames(`button button_${button}`, {disable: gameStatus})}></button>;
}
