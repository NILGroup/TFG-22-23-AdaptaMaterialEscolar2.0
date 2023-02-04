import React from 'react'
//import style from './Desarrollo.css'

import desarrolloStyle from "./Desarrollo.module.css";


export default function Desarrollo ({ attributes, children, element }){

  const renderLines = (numFilas) => {

    let lines = [];

    for(let i = 0; i < numFilas; i++){
        lines.push(<div className={desarrolloStyle.line} key={i}></div>)
    }

    return lines;
  }

  return (
    <div {...attributes}>
      
      <div contentEditable={true} className={desarrolloStyle.relative}>
        {/*<p>{element.enunciado}</p>*/}
        {children}
      </div>
    </div>
  )
  }