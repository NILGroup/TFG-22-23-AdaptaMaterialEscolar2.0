import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * Inserts a wordsearch puzzle into the Editor using the Ckeditor table 
 * */
export default class InsertWordSearchCommand extends Command {
    execute(characters) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
            let attributes = Object.fromEntries( selection.getAttributes());
            let fontType = attributes.fontFamily;
            let enumPhrase = "Encuentra " + characters.words.length + " palabras escondidas en la sopa de letras.";
            if(characters.showWords){
                enumPhrase = "Busca en la sopa de letras las siguientes palabras: ";
                characters.words.forEach((value, i) => {
                    if(i !== characters.words.length - 1)
                        enumPhrase += " " + value.clean + ", ";
                    else
                    enumPhrase += " " + value.clean;
                });
            }
            const tableUtils = this.editor.plugins.get( 'TableUtils' );
            const enunciado = writer.createElement('paragraph', {...attributes});
            
            writer.insertText(enumPhrase, enunciado);
            this.editor.model.insertContent(enunciado);
            this.editor.execute('enter');
            let table = tableUtils.createTable( writer, { rows: characters.rows, columns: characters.columns } );
            
            for(let i = 0; i < characters.rows; i++){
                let dataRow = table.getChild( i );
                let j = 0;
                for ( const tableCell of dataRow.getChildren()) {
                    const paragraph = tableCell.getChild( 0 );

                    const text = writer.createText( characters.grid[i][j] );

                    const insertPosition = writer.createPositionAt( paragraph, 0 );
                    writer.insert( text, insertPosition );
                    j++;
                }
            }
            
            
            this.editor.model.insertContent(table);
            const howTo = writer.createElement('paragraph');
            let endText = "";
            if(characters.addHowToSolve){
                endText = "Cómo resolver el ejercicio: Primero busca una de las palabras en la sopa de letras. Ten en cuenta que las palabras pueden estar escondidas en vertical, horizontal y/o diagonal, y es posible que algunas estén escritas al revés. Cuando hayas encontrado la palabra, rodéala.";
            }
            writer.insertText(endText, howTo, "end");
            writer.insert(howTo, table, "after");
            const range = writer.createRange( writer.createPositionBefore(enunciado), writer.createPositionAfter(howTo) );
            writer.setSelection( range );
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'in');
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'end');
        } );


    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'wordSearchPreview' );

        this.isEnabled = allowedIn !== null;
    }
}