import { Editor, Element as SlateElement, Point, Range } from "slate";

export const withEjercicio = (editor) => {
	const { deleteBackward, deleteForward, insertNode } = editor;

	editor.deleteBackward = (unit) => {
		// Obtenemos la seleccion actual del editor
		const { selection } = editor;
		if (selection) {
			// Obtenemos la celda
			const [ejercicio] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "ejercicio",
			});

			// Obtenemos el nodo previo a la seleccion
			const prevNodePath = Editor.before(editor, selection);
			// Apartir del nodo previobuscamos el nodo de la tabla
			const [ejercicioNode] = Editor.nodes(editor, {
				at: prevNodePath,
				match: (n) => !Editor.isEditor(n) && Element.isElement && n.type === "ejercicio",
			});
			// la selección está dentro de una tabla
			if (ejercicio) {
				const [, ejercicioPath] = ejercicio;

				const start = Editor.start(editor, ejercicioPath);
				if (Point.equals(selection.anchor, start)) {
					return;
				}
			}
			// la selección no está dentro de una tabla
			if (!ejercicio && ejercicioNode) {
				return;
			}
		}

		deleteBackward(unit);
	};
	// Evitamos que se borre la celda de la tabla cuando borremos hacia atras
	editor.deleteForward = (unit) => {
		const { selection } = editor;
		if (selection && Range.isCollapsed(selection)) {
			const [ejercicio] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "ejercicio",
			});

			const prevNodePath = Editor.after(editor, selection);
			const [ejercicioNode] = Editor.nodes(editor, {
				at: prevNodePath,
				match: (n) => !Editor.isEditor(n) && Element.isElement && n.type === "ejercicio",
			});

			if (ejercicio) {
				const [, ejercicioPath] = ejercicio;
				const end = Editor.end(editor, ejercicioPath);

				if (Point.equals(selection.anchor, end)) {
					return;
				}
			}
			if (!ejercicio && ejercicioNode) {
				return;
			}
		}

		deleteForward(unit);
	};
	//   Evitar que la tabla haga saltode linea
	return editor;
};

export default withEjercicio;
