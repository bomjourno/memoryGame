import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  TURN_AROUND_CARD,
  MAX_USER_POKE_COUNT,
  USER_POKE_COUNT,
} from "../../utils/constants";
import "./Card.css";

export function Card({
  gameInProgress,
  card,
  count,
  setCount,
  handleCardClick,
}) {
  const [frontCard, setFrontCard] = useState(false);

  useEffect(() => {
    if (frontCard) {
      setTimeout(() => {
        setFrontCard(!frontCard);
      }, TURN_AROUND_CARD);
    }
  }, [frontCard]);

  useEffect(() => {
    if (count === MAX_USER_POKE_COUNT) {
      setCount(0); //обнуляем количество "тыков" на карту
      // debugger
    }
  }, [count]);



  function handleClick() {
    handleCardClick(card.alt);
    setFrontCard(!frontCard);
    setCount(count + USER_POKE_COUNT);
  }

  return (
    <div
      className={classNames("hidden", {
        foundCard: card.front,
        startGame: !gameInProgress,
      })}
    >
      <img
        onClick={handleClick}
        className={classNames("card-item", {
          show: frontCard,
          disabled: card.front,
          cursor: frontCard,
        })}
        id={card.id}
        src={card.src}
        alt={card.alt}
      />
    </div>
  );
}
