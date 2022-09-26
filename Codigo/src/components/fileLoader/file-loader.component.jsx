import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentDocument } from '../../redux/document/document.selectors';
import { loadDocument } from '../../redux/document/document.actions';
import './file-loader.styles.scss';

class FileLoader extends React.Component {

        uploadFile =  async (event)  => {
                if (event.target.files && event.target.files[0]) {
                    this.props.loadDocument({fileL: URL.createObjectURL(event.target.files[0])})
                }
        }

        render(){
                return (<div className='file-loader'>
                <span>Selecciona un fichero:</span>
                <input type='file' onChange={this.uploadFile} accept='.pdf' required/>
                </div>);
        }

}

const mapDispatchToProps = dispatch => ({
        loadDocument: (document) => dispatch(loadDocument(document))
});
    
const mapStateToProps = createStructuredSelector({
        fileL: selectCurrentDocument
});

export default connect(mapStateToProps, mapDispatchToProps)(FileLoader);