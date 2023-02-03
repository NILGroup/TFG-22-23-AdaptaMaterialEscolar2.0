import React from 'react'
import style from './Desarrollo.css'

export default function Desarrollo ({ attributes, children, element }){
    return (
      <div {...attributes}>
        {children}
        <div contentEditable={true} className={style.relative}>
          <p>{element.enunciado}</p>
        </div>
      </div>
    )
  }