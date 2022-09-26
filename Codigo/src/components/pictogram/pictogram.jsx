import React from 'react';
import './pictogram.scss'
import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';
import { createStructuredSelector } from 'reselect';
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import { connect } from 'react-redux';
import { closePictogramFinder } from '../../redux/pictograms/pictograms.actions';

class Pictogram extends React.Component{

    handleClick = (url) => {
        this.props.editor.execute( 'insertPictogram', url );
        this.props.editor.editing.view.focus();
        this.props.closePictogramsModal();
    }


    render(){
    return(<div>
        <img className="pictogram" src={this.props.url} onClick={() => this.handleClick(this.props.url)} alt="pict" ></img>
    </div>)
    }
}

mix( Pictogram, EmitterMixin );

const mapStateToProps = createStructuredSelector({
    editor: selectEditorClass
})

const mapDispatchToProps = (dispatch) =>({
    closePictogramsModal: () => dispatch(closePictogramFinder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Pictogram);