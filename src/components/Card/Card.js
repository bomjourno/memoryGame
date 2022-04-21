import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import './Card.css'

function Card({ id, src, alt, count, setCount}) {

  const [frontCard, setFrontCard] = useState()
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
      setCount(count=0) //обнуляем количество "тыков" на карту
    }
  }, [count])

  return (
    <div className='hidden'>
      <img onClick={()=> {
        setFrontCard(!frontCard);
        setCount(count + USER_POKE_COUNT)
      }} className={classNames('card-item', {show: frontCard})} id={id} src={src} alt={alt} />
    </div>

  )
}

export default Card
