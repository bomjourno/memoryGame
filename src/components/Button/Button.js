import React from "react";
import "./Button.css";

function Button({handleClick, button}) {
  return <button onClick={handleClick} type="button" className={`button button_${button}`}></button>;
}

export default Button;
