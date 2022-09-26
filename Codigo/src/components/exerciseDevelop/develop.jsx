import React from 'react';
import './develop.scss'

class Develop extends React.Component{
    render(){
        return(
                <div className="dev">
                    {this.props.data.text}
                    <div className="answersDev">
                    {Array.from(Array(this.props.data.numLines), () =>{
                        if(this.props.data.extraspace){
                            return <div className="lineDev extraspace-linesDev"></div>
                        }
                        else return <div className="lineDev"></div>
                    })}
                    </div>
                    
                </div>
        );
    }
}

export default Develop;