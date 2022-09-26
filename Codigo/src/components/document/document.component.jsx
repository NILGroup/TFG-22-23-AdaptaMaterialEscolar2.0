import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentDocument} from '../../redux/document/document.selectors';

const Document = ({document}) => (
    <object className='pdf-file' data={document} type="application/pdf">
        <embed src={document} type="application/pdf" />
    </object>
);

const mapStateToProps = createStructuredSelector({
    document: selectCurrentDocument
});
  
export default connect(mapStateToProps)(Document);