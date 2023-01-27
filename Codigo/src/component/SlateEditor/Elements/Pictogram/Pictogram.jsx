import React from 'react'
import style from './Pictogram.css'

export default function Image ({ attributes, children, element }){
    return (
      <div {...attributes}>
        {children}
        <div contentEditable={false} className={style.relative}>
          <img src={element.url} className={style.image}  alt={element.alt}/>
        </div>
      </div>
    )
  }