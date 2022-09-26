import Command from '@ckeditor/ckeditor5-core/src/command';


/**
 * Inserts True False lines into the CKEditor
 */

export default class InsertTrueFalseCommand extends Command {
    execute( truefalse ) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {

            this.editor.execute('enter');

            let attributes = Object.fromEntries( selection.getAttributes());
            let fontType = attributes.fontFamily;

            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            let enunciado = writer.createElement('paragraph', insertPosition);
            let listType = truefalse.listType === 'ul' ? 'bulletedList' : 'numberedList';
            writer.insertText("Responde con V si es verdadero o con F si es falso las siguientes frases: ", enunciado);
            let aux = enunciado;

            this.editor.model.insertContent(enunciado);
            
            let trueFalseLine = undefined;
            let trueFalseBox = undefined;
           
            truefalse.text.forEach(phrase => {
                trueFalseLine = writer.createElement('paragraph');
                writer.insertText(phrase, trueFalseLine);
                trueFalseBox = writer.createElement('trueFalseBox');
                writer.append( trueFalseBox ,trueFalseLine);
                writer.insert(trueFalseLine, enunciado, 'after');
                writer.setSelection( trueFalseLine, 'in');
                this.editor.execute( listType);
                enunciado = trueFalseLine;
            });
            
            let howTo = writer.createElement('paragraph');
            if(truefalse.addHowToSolve){
                writer.insertText("Cómo resolver el ejercicio: Primero lee detenidamente cada frase. Después escribe en el recuadro una V si crees que la frase es verdadera o una F si crees que es falsa.", howTo, "end");
            }

            writer.insert(howTo, enunciado, 'after');
            const range = writer.createRange( writer.createPositionBefore(aux), writer.createPositionAfter(howTo) );
            writer.setSelection( range );
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'end');
            this.editor.execute('fontFamily', {value: fontType});
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'trueFalsePreview' );

        this.isEnabled = allowedIn !== null;
    }
}