import React from "react";
import { BiRectangle } from "react-icons/bi";

export default function VerdaderoFalso({ attributes, children, element }) {
    return <div {...attributes}>
      < BiRectangle className="inline"/>
       {element.texto}
       {children}
    </div>
	
}