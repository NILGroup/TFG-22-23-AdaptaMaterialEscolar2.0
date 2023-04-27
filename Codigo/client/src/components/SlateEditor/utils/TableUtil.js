import { Editor, Element, Path, Range, Transforms } from "slate";

// La gestiona de una tabla es mucho mas compleja esta clase nos ayudara a gestionarala
export class TableUtil {
	constructor(editor) {
		this.editor = editor;
	}
	// Inserccion de tabla, se define en base al numero de columnas y filas elegidas
	insertTable = (celltext, rows = 0, columns = 0, style = "w-[100%]") => {
		// Primero evitaremos insertar una tabla dentro de una tabla
		// Buscamos la tabla en el editor
		const [tableNode] = Editor.nodes(this.editor, {
			match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
			mode: "highest",
		});

		// Si ya existe un nodo de tabla en el editor, se sale de la función inmediatamente.
		if (tableNode) return;

		// Creamos una matriz bidimensional con las dimensiones especificadas por rows y columns o por el array pasado.
		let newTable;
		if (rows > 0 && columns > 0) newTable = this.createTableNode(rows, columns, style);
		else newTable = this.createTableNodeByArray(celltext, style);

		// El mode: highest en el insert indica que se inserte en el nodo más alto.
		Transforms.insertNodes(this.editor, newTable, {
			mode: "highest",
		});
		Transforms.insertNodes(this.editor, { type: "paragraph", children: [{ text: "" }] }, { mode: "highest" });
	};

	removeTable = () => {
		Transforms.removeNodes(this.editor, {
			match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
			// mode:'highest'
		});
	};

	// Funcion para crear el nodo tabla con celdas vacias
	createTableNode = (rows, columns, style) => {
		const cellText = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""));
		const tableChildren = Array.from(cellText, (value) => createRow(value));

		let tableNode = {
			type: "table",
			style,
			children: tableChildren,
		};
		return tableNode;
	};

	createTableNodeByArray = (celltext, style) => {
		const tableChildren = Array.from(celltext, (value) => createRow(value));

		let tableNode = {
			type: "table",
			style,
			children: tableChildren,
		};
		return tableNode;
	};
}

// Funcion para crear celdas
export const createTableCell = (text) => {
	return {
		type: "table-cell",
		children: [
			{
				type: "paragraph",
				children: [{ text }],
			},
		],
	};
};

// Funcion para crear filas
export const createRow = (cellText) => {
	const newRow = Array.from(cellText, (value) => createTableCell(value));
	return {
		type: "table-row",
		children: newRow,
	};
};
