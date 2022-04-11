import React from 'react';
import './Card.css'

function Card({handleFontBack, id, src, alt, front, cardId}) {
  const classes = [];
  const data = []

  if(front) {
    classes.push('done');
  }

  // if(cardId === id) {
  //   data.push(handleFontBack, id, src, alt)
  // }

  return (
    <div id={cardId} className='hidden'>
      {/* <img /> */}
      {/* <img onClick={() => data.handleFontBack(id)} className={`card-item ${classes.join(' ')}`} id={data.id} src={src} alt={alt} /> */}
      <img onClick={() => handleFontBack(id)} className={`card-item ${classes.join(' ')}`} id={id} src={src} alt={alt} />
    </div>

  )
}

export default Card
