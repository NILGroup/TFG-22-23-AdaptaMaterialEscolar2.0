import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDocumentIsLoaded } from '../../redux/document/document.selectors';

import './editorpage.styles.scss';
import FileLoader from '../../components/fileLoader/file-loader.component';
import EditorWorkplace from '../../components/editorWorkplace/editorWorkplace.component';


class EditorPage extends React.Component {

    constructor(props){
        super();
    }

    render(){
        return (<div className='editor-page'>
                {this.props.fileIsLoaded ? (<EditorWorkplace/>) : (<FileLoader/>)}
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    fileIsLoaded: selectDocumentIsLoaded
});

export default connect(mapStateToProps)(EditorPage);