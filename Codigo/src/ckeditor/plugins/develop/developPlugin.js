import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertDevelopCommand from './insertDevelopCommand';
import Develop from '../../../components/exerciseDevelop/develop';

export default class DevelopPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertDevelop', new InsertDevelopCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'developPreview', {

            isObject: true,

            allowWhere: '$text',

            isInline: false,

            allowAttributes: [ 'develop' ]
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'div',
                classes: 'div'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                return modelWriter.createElement( 'developPreview', {
                    id: parseInt( viewElement.getAttribute( 'data-develop' ) )
                } );
            }
        } );


        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'developPreview',
            view: ( modelElement, { writer: viewWriter } ) => {

                return viewWriter.createEmptyElement( 'div', {
                    class: 'develop'
                } );
            }
        } );


        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'developPreview',
            view: ( modelElement, { writer: viewWriter } ) => {

                const id = modelElement.getAttribute( 'develop' );


                const section = viewWriter.createContainerElement( 'div', {
                    class: 'develop'
                } );

                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'develop__react-wrapper'
                }, function( domElement ) {

                    ReactDOM.render(
                        <Provider store={ store }>
                            <Develop data={id}/>
                        </Provider>
                        ,
                        domElement
                    );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'develop preview widget' } );
            }
        } );
    }
}