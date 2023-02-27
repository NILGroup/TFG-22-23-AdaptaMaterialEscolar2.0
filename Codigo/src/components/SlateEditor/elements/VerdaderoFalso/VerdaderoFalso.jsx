import React from "react";


export default function VerdaderoFalso({ attributes, children }) {
    return <div {...attributes}>
       {children}
    </div>
	
}