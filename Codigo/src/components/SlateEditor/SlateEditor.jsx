// Importamos dependencias react
import React, { useCallback, useState } from "react";

// Importamos la factoria de slate
import { createEditor } from "slate";

// Importamos los componentes de slate y los plugigs de react
import { Slate, Editable, withReact } from "slate-react";
import Pictogram from "./elements/Pictogram/Pictogram";
import Definition from "./elements/Definition/Definition";
import Linea from "./elements/Linea/Linea";
import WordSearch from "./elements/WordSearch/WordSearch";
import Toolbar from "./Toolbar/Toolbar";

import { ModalFactory } from "../Modal/ModalFactory";

import style from "./SlateEditor.module.css";
import Staff from "./elements/Staff/Staff";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

export default function SlateEditor() {
	// Creamos el objeto editor de slate
	const [editor] = useState(() => withReact(createEditor()));

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.

	//TODO staff indica todos lo tipos de pauta.

	const renderElement = useCallback((props) => {
		switch (props.element.type) {
			case "pictogram":
				return <Pictogram {...props} />;
			case "definition":
				return <Definition {...props} />;
			case "staff":
				return <Staff {...props} />;
			case "linea":
				return <Linea {...props} />;
			case "wordSearch":
				return <WordSearch {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);

	// Estado del modal [esta abierto?, cambiar el estado del modal]
	const [isOpen, setIsOpen] = useState(false);

	// Tipo de modal [tipo actual, cambiar el tipo de modal]
	const [modalType, setModalType] = useState(null);

	// Funcion auxiliar para abrir el modal de un tipo especifico
	const openModal = (modalType) => {
		setIsOpen(true);
		setModalType(modalType);
	};

	return (
		<>
			<Slate editor={editor} value={initialValue}>
				<div className={style.editor}>
					<div className={style.editorHeader}>
						<Toolbar editor={editor} openModal={openModal} />
					</div>
					<div className={style.content}>
						<Editable
							editor={editor}
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							className={style.editable}
							autoFocus
						/>
					</div>
				</div>
			</Slate>

			<ModalFactory
				type={modalType}
				editor={editor}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</>
	);
}

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
	return (
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
		>
			{props.children}
		</span>
	);
};

const DefaultElement = (props) => {
	return <p {...props.attributes}>{props.children}</p>;
};
