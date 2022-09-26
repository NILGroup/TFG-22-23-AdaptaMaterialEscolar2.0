import "./wordsearch.styles.scss";
import React from 'react';

class WordSearch extends React.Component{

    render(){
        return(
            <table>
                <tbody>
                {this.props.data.grid.map((i, id1) =>
                    <tr key={"tr-" + id1}>
                    {i.map((j, id2) =>
                        <td key={"td-" + id1 + id2}>{j}</td>
                    )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}

export default WordSearch;