import React from 'react';
import './Card.css'

function Card({handleFontBack, id, src, alt, front, cardId}) {
  const classes = [];

  if(front) {
    classes.push('done');
  }

  return (
    <div className='hidden'>
      {/* <img onClick={() => data.handleFontBack(id)} className={`card-item ${classes.join(' ')}`} id={data.id} src={src} alt={alt} /> */}
      <img onClick={() => handleFontBack(id)} className={`card-item ${classes.join(' ')}`} id={id} src={src} alt={alt} />
    </div>

  )
}

export default Card
