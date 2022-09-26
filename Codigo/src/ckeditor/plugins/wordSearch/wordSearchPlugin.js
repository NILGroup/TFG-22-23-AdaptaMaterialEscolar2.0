import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget,
    viewToModelPositionOutsideModelElement} from '@ckeditor/ckeditor5-widget/src/utils';
import InsertWordSearchCommand from './insertWordSearchCommand';


export default class WordSearchPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertWordSearch', new InsertWordSearchCommand( this.editor ) );

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
        );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'wordSearchPreview', {

            isObject: true,

            allowWhere: '$block',

            isInline: false

        } 
        
        );

        schema.register( 'wordSearchRow', {

            isObject: false,
            isBlock: false,
            allowIn: "wordSearchPreview",
            
            allowWhere: '$block',

            isInline: false
        } 
        
        );

        schema.register( 'wordSearchCell', {
         
            isLimit: true,
            isObject: false,
            allowIn: 'wordSearchRow',

   
            allowContentOf: '$text',
            
            allowAttributes: ['name']
        } );


    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: {
                name: 'div',
                classes: 'word-search-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: {
                name: 'div',
                classes: 'word-search-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'word-search-box' } );

                return toWidget( section, viewWriter, { label: 'word search box widget' } );
            }
        } );

        conversion.elementToElement( {
            model: 'wordSearchRow',
            view: {
                name: 'div',
                classes: 'word-search-row'
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'div',
                classes: 'word-search-cell'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

                return modelWriter.createElement( 'wordSearchCell', { name } );
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'wordSearchCell',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createPlaceholderView( modelItem, viewWriter );
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'wordSearchCell',
            view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
        } );


        function createPlaceholderView( modelItem, viewWriter ) {
            const name = modelItem.getAttribute( 'name' );

            const placeholderView = viewWriter.createEditableElement( 'div', {
                class: 'wordSearchCell'
            }, {
                isAllowedInsideAttributeElement: true
            } );

            const innerText = viewWriter.createText( name );
            viewWriter.insert( viewWriter.createPositionAt( placeholderView, 1 ), innerText );

            return placeholderView;
        }
    }

}