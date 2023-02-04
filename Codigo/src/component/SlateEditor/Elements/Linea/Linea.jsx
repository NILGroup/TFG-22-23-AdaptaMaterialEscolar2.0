import React from 'react'

import style from "./Linea.module.css";


export default function Linea ({ attributes, children, element }){

    return (
      <div {...attributes} className={style.line}>
          {children}
      </div>
    )
  }