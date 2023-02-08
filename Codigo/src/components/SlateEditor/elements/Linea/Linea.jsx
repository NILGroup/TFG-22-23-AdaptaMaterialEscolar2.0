import React from 'react'

import style from "./Linea.module.css";


export default function Linea ({ attributes, children, element }){

  if(element.tipoPauta === "lineaNormal"){
    return (
      <div {...attributes} className={style.lineaNormal}>
          {children}
      </div>
    )
  }
  else if(element.tipoPauta === "lineaDoblePauta"){
    return (
      <div {...attributes} className={style.lineaDoblePauta}>
          {children}
      </div>
    )
  }
  else{
    return (
      <div {...attributes} className={style.lineaNormal}>
          {children}
      </div>
    )
  }

}