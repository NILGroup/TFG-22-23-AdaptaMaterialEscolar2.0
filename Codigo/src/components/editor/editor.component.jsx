import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import './editor.styles.scss'
import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageEditing from '@ckeditor/ckeditor5-image/src/image/imageediting';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import PictogramEditing from '../../ckeditor/plugins/pictograms/pictogramEditing';
import { createStructuredSelector } from 'reselect';
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import { connect } from 'react-redux';
import { setEditor } from '../../redux/editor/editor.actions';
import WordSearchPlugin from '../../ckeditor/plugins/wordSearch/wordSearchPlugin';
import DefinitionsPlugin from '../../ckeditor/plugins/definitions/definitionsPlugin';
import TrueFalsePlugin from '../../ckeditor/plugins/trueFalse/trueFalsePlugin';
import DevelopPlugin from '../../ckeditor/plugins/develop/developPlugin';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/es.js'
import {getColors} from "./colors";
import FillGapsPlugin from '../../ckeditor/plugins/fillblanks/trueFillGapsPlugin';
import {token} from '../../ckeditor/license'
class Editor extends React.Component{
    
    constructor(props){
        super();
        this.state = {editorData: ""};
        this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
        this.editor = props.editor;
        this.editorConfig = {
            cloudServices: {
                tokenUrl: token
            },
            language: 'es',
            plugins: [ExportPdf, Essentials, Heading, Bold, Italic, Underline, Paragraph, Table, TableToolbar, PictogramEditing, Alignment, WordSearchPlugin, 
                    DefinitionsPlugin, TrueFalsePlugin, DevelopPlugin, FontFamily, FontSize, FontColor, FontBackgroundColor, Indent, IndentBlock, ListStyle, 
                    TodoList, BlockQuote, Image, ImageInsert, ImageToolbar, ImageStyle, ImageResize, ImageEditing, FillGapsPlugin, PageBreak, TableCellProperties,
                    TableProperties
                ],
            
            toolbar: [  'exportPdf', '|',
                        'undo', 'redo', '|',
                        'heading','|',
                        'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'bold', 'italic', 'underline', '|',
                        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', 'outdent', 'indent', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                         'blockQuote' ,'insertTable', 'imageInsert', '|', 'pageBreak'
            ],
            
            image: {
                // Configure the available styles.
                styles: [
                    'alignLeft', 'alignCenter', 'alignRight'
                ],
    
                // Configure the available image resize options.
                resizeOptions: [
                    {
                        name: 'resizeImage:original',
                        value: null,
                        icon: 'original'
                    },
                    {
                        name: 'resizeImage:25',
                        value: '25',
                        icon: 'small'
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50',
                        icon: 'medium'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75',
                        icon: 'large'
                    }
                ],
    
                // You need to configure the image toolbar, too, so it shows the new style
                // buttons as well as the resize buttons.
                toolbar: [
                    'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                    '|',
                    'imageResize',
                    '|',
                    'imageTextAlternative'
                ]
            },
            fontFamily: {
                options: [
                    'Arial, Helvetica, sans-serif',
                    'Comic Sans MS, Comic Sans',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif'
                ],
                supportAllValues: true
            },
            fontSize: {
                options: [
                    8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48
                ],
                supportAllValues: true
            },
            
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableProperties',
                    'tablecellProperties'
                ],
                tableProperties: {
                    borderColors: getColors(),
                    backgroundColors: getColors()
                },
                tableCellProperties: {
                    borderColors: getColors(),
                    backgroundColors: getColors()
                }
            },
            exportPdf: {
                stylesheets: [
                    'EDITOR_STYLES',
                     '/tfg/2021/adapta/editorStyles.css'
                ],
                fileName: 'my-file.pdf',
                converterOptions: {
                    format: 'A4',
                    margin_top: '20mm',
                    margin_bottom: '20mm',
                    margin_right: '12mm',
                    margin_left: '12mm',
                    page_orientation: 'portrait'
                }
            },
            fontColor: {
                colors: getColors(),
                columns: 9
            },
            fontBackgroundColor: {
                colors: getColors(),
                columns: 9
            },
        }
    }

    

    handleEditorDataChange( evt, editor ) {
        console.log(editor.getData());
        this.setState( {
            editorData: editor.getData()
        } );
    }

    render() {
        return (
        <div className="document-editor">
            <div className="document-editor__editable-container">
            <CKEditor editor={DecoupledEditor} 
                data={this.state.editorData} 
                config={this.editorConfig} 
                onChange={this.handleEditorDataChange} 
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    this.props.setEditor(editor);
                    editor.execute( 'fontFamily', { value: 'Arial, Helvetica, sans-serif' } );
            } }/>
        </div>
    </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    editor: selectEditorClass
})

const mapDispatchToProps = (dispatch) => ({
    setEditor: (editor) => dispatch(setEditor(editor))
})
export default connect(mapStateToProps, mapDispatchToProps)(Editor);