import React from 'react';
// React Icons
import {AiOutlineBold} from  "react-icons/ai"
//Diccionario de iconos
const iconList={
    bold: <AiOutlineBold size={15}/>
}




export default function Icon ({icon}){
    return(
        iconList[icon]
    )
}
