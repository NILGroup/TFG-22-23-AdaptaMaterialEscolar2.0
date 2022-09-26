import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { closeFillGapsModal } from '../../redux/fillGaps/fillgaps.actions';

class FillGaps extends React.Component{
    
    constructor(){
            super();
            this.state = {searchInput: ""};
    }

    handleChange = async event => {
        const {value} = event.target;
        this.setState({searchInput: value});
    }


    render(){
        return(<div className="fillgaps-modal">
                <div className="fillGaps">
                    <label>Introduce entre corchetes {"{}"} el texto a subrayar </label>
                    <input type="text" className="searchInput" onChange={this.handleChange}/>
                    <button onClick={this.props.closeModal}>Close</button>
        </div></div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeFillGapsModal())
});

const mapStateToProps = createStructuredSelector({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(FillGaps);