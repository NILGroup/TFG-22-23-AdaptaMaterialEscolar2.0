import React from 'react';
import './summary.scss'

function Summary(props){
    return(<div>
        <p src={props.url} onClick={() => props.onClick(props.url)}></p>
    </div>)
}

export default Summary;