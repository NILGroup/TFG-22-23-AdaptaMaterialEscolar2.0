// Importamos dependencias react
import React, { useCallback, useMemo, useState } from "react";

// Importamos la factoria de slate
import { createEditor } from "slate";

// Importamos los componentes de slate y los plugigs de react
import { Editable, Slate, withReact } from "slate-react";
import Definition from "./elements/Definition/Definition";
import ImageElement from "./elements/ImageElement/ImageElement";
import Linea from "./elements/Linea/Linea";
import WordSearch from "./elements/WordSearchElement/WordSearchElement";
import Toolbar from "./Toolbar/Toolbar";

import { ModalFactory } from "../Modal/ModalFactory";

import Icon from "./elements/Icon/Icon";
import Leaf from "./elements/Leaf/Leaf";
import Staff from "./elements/Staff/Staff";
import VerdaderoFalso from "./elements/VerdaderoFalso/VerdaderoFalso";
import { withEmbeds } from "./plugins/withEmbeds";
import { withIcons } from "./plugins/withIcons";
import { withImages } from "./plugins/withImages";
import style from "./SlateEditor.module.css";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

export default function SlateEditor() {
	// Creamos el objeto editor de slate
	const editor = useMemo(
		() => withIcons(withImages(withEmbeds(withReact(createEditor())))),
		[]
	);

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.

	//TODO staff indica todos lo tipos de pauta.

	const renderElement = useCallback((props) => {
		switch (props.element.type) {
			// TODO: No funciona el alt de la imagen
			case "image":
				return <ImageElement {...props} />;
			case "definition":
				return <Definition {...props} />;
			case "embeds":
				return <Staff {...props} />;
			case "icon":
				return <Icon {...props} />;
			case "linea":
				return <Linea {...props} />;
			case "wordSearch":
				return <WordSearch {...props} />;
			case "list-item":
				return <VerdaderoFalso {...props} />;
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

const DefaultElement = (props) => {
	return <p {...props.attributes}>{props.children}</p>;
};
