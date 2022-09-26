import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertTrueFalseCommand from './insertTrueFalseCommand';
import TrueFalse from '../../../components/exerciseTrueFalse/trueFalse';

export default class TrueFalselugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertTrueFalse', new InsertTrueFalseCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'trueFalsePreview', {

            isObject: true,

            allowWhere: '$text',

            isInline: false,

            allowAttributes: [ 'truefalse' ]
        } );

        schema.register( 'trueFalseBox', {
            allowWhere: '$text',
            isObject: true,
            isInline: true
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'trueFalseBox',
            view: {
                name: 'span',
                classes: 'true-false-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'trueFalseBox',
            view: {
                name: 'span',
                classes: 'true-false-box'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'trueFalseBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'span', { class: 'true-false-box' } );

                return toWidget( section, viewWriter, { label: 'trueFalseBox' } );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'table',
                classes: 'table'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                return modelWriter.createElement( 'trueFalsePreview', {
                    id: parseInt( viewElement.getAttribute( 'data-characters' ) )
                } );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'trueFalsePreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                return viewWriter.createEmptyElement( 'table', {
                    class: 'table',
                } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'trueFalsePreview',
            view: ( modelElement, { writer: viewWriter } ) => {
               
                const id = modelElement.getAttribute( 'truefalse' );

                const section = viewWriter.createContainerElement( 'div', {
                    class: ''
                } );

                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'trueFalse__react-wrapper'
                }, function( domElement ) {

                    ReactDOM.render(
                        <Provider store={ store }>
                            <TrueFalse data={id}/>
                        </Provider>
                        ,
                        domElement
                    );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'trueFalse preview widget' } );
            }
        } );
    }
}