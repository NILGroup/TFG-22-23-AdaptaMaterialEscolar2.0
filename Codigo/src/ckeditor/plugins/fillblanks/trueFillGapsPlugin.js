import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertFillGapsCommand from './insertFillGapsCommand';

export default class FillGapsPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this.editor.commands.add( 'insertFillGaps', new InsertFillGapsCommand( this.editor ) );
    }

}