import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import './Card.css'

function Card({ id, src, count, setCount, card, handleCardClick, alt, front}) {

  const [frontCard, setFrontCard] = useState(false)
  // const [frontCard, setFrontCard] = useState(false)
  const USER_POKE_COUNT = 1;
  const MAX_USER_POKE_COUNT = 2;

  useEffect(() => {
    if(frontCard) {
      setTimeout(() => {
        setFrontCard(!frontCard)
      }, 3000)
    }
  }, [frontCard])

  useEffect(() => {
    if(count === MAX_USER_POKE_COUNT) {
      setCount(0) //обнуляем количество "тыков" на карту
    }
  }, [count])

  function handleClick() {
    handleCardClick(card)
  }

  return (
    <div className={classNames('hidden', {foundCard: front})}>
      <img onClick={()=> {
        setFrontCard(!frontCard);
        setCount(count + USER_POKE_COUNT);
        handleClick();
        // handleFrontCard();
      }} className={classNames('card-item', {show: frontCard, disabled: front})} id={id} src={src} alt={alt} />
    </div>
  )
}

export default Card
