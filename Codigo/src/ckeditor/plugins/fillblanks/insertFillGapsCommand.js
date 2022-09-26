import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertFillGapsCommand extends Command {
    execute( fillgapsData ) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
            let attributes = Object.fromEntries( selection.getAttributes());
            let fontType = attributes.fontFamily;
            this.editor.model.insertContent(writer.createElement('paragraph'));
            let title = "Completa los huecos con las siguientes palabras:";
            fillgapsData.words.forEach((w,i) =>{
                if(i !== fillgapsData.words.length - 1)
                    title += " " + w.word.toUpperCase() + ",";
                else title += " " + w.word.toUpperCase();
            })
            let text = "";
            fillgapsData.text.forEach(t => {
                text+= t + " ";
            })
            
            let enunciado = writer.createElement('paragraph');
            writer.insertText(title, enunciado);
            this.editor.model.insertContent(enunciado);
            this.editor.execute('enter');
            let phrase = writer.createElement('paragraph');
            writer.insertText(text, phrase);
            this.editor.model.insertContent(phrase);

            this.editor.execute('enter');
            
            const howTo = writer.createElement('paragraph');
            let endText = "";
            if(fillgapsData.addHowToSolve){
                endText = "Cómo resolver el ejercicio: Primero lee cada palabra. Después lee detenidamente el texto y completa los huecos subrayados con la palabra correcta.";
            }
            writer.insertText(endText, howTo, "end");
            this.editor.model.insertContent(howTo);
            const range = writer.createRange( writer.createPositionBefore(enunciado), writer.createPositionAfter(howTo) );
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