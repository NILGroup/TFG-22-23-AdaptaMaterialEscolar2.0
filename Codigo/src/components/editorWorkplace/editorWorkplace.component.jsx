import React from 'react';
import Toolbar from '../toolBar/toolbar.component';
import Editor from '../editor/editor.component';
import Document from '../document/document.component';
class EditorWorkplace extends React.Component{

    render() {
        return (<div className='editor-container'>
        <div className="editor-container__pdf">
            <Document/>
        </div>
        <div className='editor-half'>
            <Toolbar/>
            <Editor/>
        </div>
        
    </div>);
    }
}

export default EditorWorkplace;