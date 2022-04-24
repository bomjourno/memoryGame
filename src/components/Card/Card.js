import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import './Card.css'

export function Card({ card, count, setCount, handleCardClick}) {

  const [frontCard, setFrontCard] = useState(false)
  const USER_POKE_COUNT = 1;
  const MAX_USER_POKE_COUNT = 2;
  const TURN_AROUND_CARD = 3000;

  useEffect(() => {
    if(frontCard) {
      setTimeout(() => {
        setFrontCard(!frontCard)
      }, TURN_AROUND_CARD)
    }
  }, [frontCard])

  useEffect(() => {
    if(count === MAX_USER_POKE_COUNT) {
      setCount(0) //обнуляем количество "тыков" на карту
    }
  }, [count])

  function handleClick() {
    handleCardClick(card.alt)
    setFrontCard(!frontCard);
    setCount(count + USER_POKE_COUNT);
  }

  return (
    <div className={classNames('hidden', {foundCard: card.front})}>
      <img onClick={()=> {
        handleClick();
      }} className={classNames('card-item', {show: frontCard, disabled: card.front})} id={card.id} src={card.src} alt={card.alt} />
    </div>
  )
}
