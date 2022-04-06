import React from "react";
import "./Button.css";

function Button(props) {
  return <button onClick={props.func} type="button" className={`button button_${props.button}`}></button>;
}

export default Button;
