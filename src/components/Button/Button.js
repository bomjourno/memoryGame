import React from "react";
import "./Button.css";

export function Button({handleClick, button}) {
  return <button onClick={handleClick} type="button" className={`button button_${button}`}></button>;
}
