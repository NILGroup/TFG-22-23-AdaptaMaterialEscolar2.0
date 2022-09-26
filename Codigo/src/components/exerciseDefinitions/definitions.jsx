import React from 'react';
import './definitions.scss'

class Definitions extends React.Component{
    render(){
        return(
            <div className="exerciseDef">
                {this.props.data.listType === "ul" ?
                <ul>
                {this.props.data.text.map((value) => 
                    <div className="defi">
                        <li>{value}</li>
                        {Array.from(Array(this.props.data.numLines - 1), () =>{
                            if(this.props.data.extraspace){
                                return <div className="lineDefi extraspace-linesDefi"></div>
                            }
                            else return <div className="lineDefi"></div>
                        })}
                    </div>
                )}
                </ul>
                :
                <ol>
                {this.props.data.text.map((value) => 
                    <div className="defi">
                        <li>{value}</li>
                        {Array.from(Array(this.props.data.numLines - 1), () =>{
                            if(this.props.data.extraspace){
                                return <div className="lineDefi extraspace-linesDefi"></div>
                            }
                            else return <div className="lineDefi"></div>
                        })}
                    </div>
                )}
                </ol>
                }
            </div>
        );
    }
}

export default Definitions;