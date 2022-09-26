import React from 'react';
import './trueFalse.scss'

class TrueFalse extends React.Component{
    render(){
        return(
            <div className="exerciseTF">
                {this.props.data.listType === "ul" ?
                <ul>
                {this.props.data.text.map((value) => 
                    <div className="tf">
                        <li>{value}</li>
                        
                    </div>
                )}
                </ul>
                :
                <ol>
                {this.props.data.text.map((value) => 
                    <div className="tf">
                        <li>{value}</li>
                        
                    </div>
                )}
                </ol>
                }
                
            </div>
            
        );
    }
}

export default TrueFalse;