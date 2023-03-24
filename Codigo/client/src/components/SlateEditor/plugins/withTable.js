import { Editor, Element as SlateElement, Point, Range } from "slate";

export const withTable = (editor) => {
	const { deleteBackward, deleteForward, insertBreak } = editor;

	// Evitamos que se borre la celda de la tabla cuando borremos hacia delante
	// unit -> unidad a borrar
	editor.deleteBackward = (unit) => {
		// Obtenemos la seleccion actual del editor
		const { selection } = editor;
		if (selection) {
			// Obtenemos la celda
			const [cell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "table-cell",
			});

			// Obtenemos el nodo previo a la seleccion
			const prevNodePath = Editor.before(editor, selection);
			// Apartir del nodo previobuscamos el nodo de la tabla
			const [tableNode] = Editor.nodes(editor, {
				at: prevNodePath,
				match: (n) => !Editor.isEditor(n) && Element.isElement && n.type === "table-cell",
			});
			// la selección está dentro de una tabla
			if (cell) {
				const [, cellPath] = cell;

				const start = Editor.start(editor, cellPath);
				if (Point.equals(selection.anchor, start)) {
					return;
				}
			}
			// la selección no está dentro de una tabla
			if (!cell && tableNode) {
				return;
			}
		}

		deleteBackward(unit);
	};
	// Evitamos que se borre la celda de la tabla cuando borremos hacia atras
	editor.deleteForward = (unit) => {
		const { selection } = editor;
		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "table-cell",
			});

			const prevNodePath = Editor.after(editor, selection);
			const [tableNode] = Editor.nodes(editor, {
				at: prevNodePath,
				match: (n) => !Editor.isEditor(n) && Element.isElement && n.type === "table-cell",
			});

			if (cell) {
				const [, cellPath] = cell;
				const end = Editor.end(editor, cellPath);

				if (Point.equals(selection.anchor, end)) {
					return;
				}
			}
			if (!cell && tableNode) {
				return;
			}
		}

		deleteForward(unit);
	};
	//   Evitar que la tabla haga saltode linea
	editor.insertBreak = () => {
		const { selection } = editor;

		if (selection) {
			const [table] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "table",
			});

			if (table) {
				return;
			}
		}

		insertBreak();
	};
	return editor;
};

export default withTable;
