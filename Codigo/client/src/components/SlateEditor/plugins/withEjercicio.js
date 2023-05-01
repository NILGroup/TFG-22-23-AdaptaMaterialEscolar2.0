import { Editor, Element as SlateElement, Point, Range } from "slate";

export const withEjercicio = (editor) => {
	const { deleteBackward, deleteForward, insertNode } = editor;

	// Evitamos que se borre el ejercicio cuando borremos hacia delante
	// unit -> unidad a borrar
	editor.deleteBackward = (unit) => {
		// Obtenemos la seleccion actual del editor
		const { selection } = editor;
		if (selection) {
			// Obtenemos el ejercicio
			const [ejercicio] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "ejercicio",
			});

			// la selección está dentro de un ejercicio
			if (ejercicio) {
				const [, ejercicioPath] = ejercicio;

				const start = Editor.start(editor, ejercicioPath);
				if (Point.equals(selection.anchor, start)) {
					return;
				}
			}
			// la selección no está dentro de un ejercicio
			if (!ejercicio) {
				return;
			}
		}

		deleteBackward(unit);
	};
	// Evitamos que se borre el ejercicio cuando borremos hacia atras
	editor.deleteForward = (unit) => {
		const { selection } = editor;
		if (selection && Range.isCollapsed(selection)) {
			const [ejercicio] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "ejercicio",
			});


			if (ejercicio) {
				const [, ejercicioPath] = ejercicio;
				const end = Editor.end(editor, ejercicioPath);

				if (Point.equals(selection.anchor, end)) {
					return;
				}
			}
			if (!ejercicio) {
				return;
			}
		}

		deleteForward(unit);
	};
    editor.insertNode = (unit) => {

        insertNode(unit)
    } 
	return editor;
};

export default withEjercicio;
