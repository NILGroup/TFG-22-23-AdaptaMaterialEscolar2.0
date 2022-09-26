
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertPictogramCommand from './insertPictogramCommand';
import ReactDOM from "react-dom";
import Pictogram from '../../../components/pictogram/pictogram';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

export default class PictogramEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertPictogram', new InsertPictogramCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'pictogramPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            isInline: true,

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: [ 'url' ]
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;
        conversion.attributeToAttribute( { model: 'source', view: 'src' } );
        // <productPreview> converters ((data) view → model)
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'img',
                classes: 'pictogram'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Read the "data-id" attribute from the view and set it as the "id" in the model.
                return modelWriter.createElement( 'pictogramPreview', {
                    id: parseInt( viewElement.getAttribute( 'data-id' ) )
                } );
            }
        } );

        // <productPreview> converters (model → data view)
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pictogramPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the data view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="..."></section>
                return viewWriter.createContainerElement( 'img', {
                    class: 'pictogram',
                    src: modelElement.getAttribute( 'url' )
                } );
            }
        } );

        // <productPreview> converters (model → editing view)
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pictogramPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the editing view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="...">
                //     <div class="product__react-wrapper">
                //         <ProductPreview /> (React component)
                //     </div>
                // </section>
                const id = modelElement.getAttribute( 'url' );

                // The outermost <section class="product" data-id="..."></section> element.
                const section = viewWriter.createContainerElement( 'img', {
                    class: 'pictogram',
                    src: id
                } );

                // The inner <div class="product__react-wrapper"></div> element.
                // This element will host a React <ProductPreview /> component.
                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'pictogram__react-wrapper'
                }, function( domElement ) {
                    // This the place where React renders the actual product preview hosted
                    // by a UIElement in the view. You are using a function (renderer) passed

                    ReactDOM.render(
                        <Provider store={ store }>
                            <Pictogram url={id} />
                        </Provider>
                        ,
                        domElement
                    );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'pictogram preview widget' } );
            }
        } );
    }
}