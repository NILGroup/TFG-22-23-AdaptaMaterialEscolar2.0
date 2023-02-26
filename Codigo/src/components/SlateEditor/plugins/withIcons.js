
export const withIcons = (editor) => {
    const { isVoid, isInline} = editor
    
    // Cuando encuntre un icono lo identificara como vacio por lo que no dejara editarlo pero si seleccionarlo y por tanto borrarlo
    editor.isVoid = element => (element.type === 'icon' ? true : isVoid(element))
    // Entendera que es un elemento en linea y permitira escribir al lado
    editor.isInline = element => (element.type) === 'icon' ? true : isInline(element);

    return editor
  }