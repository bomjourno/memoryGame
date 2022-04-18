import React, { useEffect } from 'react';
import './Card.css'

function Card({handleFontBack, id, src, alt, front, count, setCount}) {
  const classes = [];



  if(front) {
    classes.push('done');
  }

  function handleSubmit() {
    handleFontBack(id)
    setTimeout(() => {
      handleFontBack(id);
      setCount(count-2)
    }, 3000)
  }

  return (
    <div className='hidden'>
      <img onClick={handleSubmit} className={`card-item ${classes.join(' ')}`} id={id} src={src} alt={alt} />
    </div>

  )
}

export default Card
