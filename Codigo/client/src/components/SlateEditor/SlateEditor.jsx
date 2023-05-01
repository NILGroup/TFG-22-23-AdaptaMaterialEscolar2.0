// Importamos dependencias react
import React, { useCallback, useMemo, useState } from "react";

// Importamos la factoria de slate
import { createEditor } from "slate";

// Importamos los componentes de slate y los plugigs de react
import { Editable, Slate, withReact } from "slate-react";
import ImageElement from "./elements/ImageElement/ImageElement";
import Linea from "./elements/Linea/Linea";
import Toolbar from "./Toolbar/Toolbar";

import { ModalFactory } from "../Modal/ModalFactory";

import Icon from "./elements/Icon/Icon";
import Leaf from "./elements/Leaf/Leaf";
import PictotranslatorElement from "./elements/PictotranslatorElement/PictotranslatorElement";
import RelateConcepts from "./elements/RelateConcepts/RelateConcepts";
import Staff from "./elements/Staff/Staff";
import Table from "./elements/Table/Table";
import Td from "./elements/Table/Td";
import Tr from "./elements/Table/Tr";
import { withEmbeds } from "./plugins/withEmbeds";
import { withInline } from "./plugins/withInline";
import { withTable } from "./plugins/withTable";
import Ejercicio from "./elements/Ejercicio/Ejercicio";
import withEjercicio from "./plugins/withEjercicio";
import BloqueEditable from "./elements/BloqueEditable/BloqueEditable";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

export default function SlateEditor() {
	// Creamos el objeto editor de slate
	const editor = useMemo(() => withEjercicio(withTable(withEmbeds(withInline(withReact(createEditor()))))), []);

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.

	//TODO staff indica todos lo tipos de pauta.

	const renderElement = useCallback((props) => {
		switch (props.element.type) {
			// TODO: No funciona el alt de la imagen
			case "image":
				return <ImageElement {...props} />;
			case "ejercicio":
				return <Ejercicio {...props} />;
			case "bloqueEditable":
				return <BloqueEditable {...props} />;
			case "embeds":
				return <Staff {...props} />;
			case "staff":
				return <Staff {...props} />;
			case "icon":
				return <Icon {...props} />;
			case "linea":
				return <Linea {...props} />;
			case "table":
				return <Table {...props} />;
			case "table-row":
				return <Tr {...props} />;
			case "table-cell":
				return <Td {...props} />;
			case 'bulleted-list':
            	return <ul className="list-disc pl-12" {...props.attributes}>{props.children}</ul>
        	case 'numbered-list':
            	return <ol className="list-decimal pl-12" {...props.attributes}>{props.children}</ol>
			case 'list-item':
        	    return <li {...props.attributes}>{props.children}</li>
			case "pictotranslator":
				return <PictotranslatorElement {...props} openModal={openModal} />;
			case "relateConcepts":
				return <RelateConcepts {...props}/>;
			case "enunciado":
				return <span {...props.attributes}>{props.children}</span>
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
	const onKeyDown = (event) => {
		if (event.key === 'Tab') {
		  event.preventDefault();
		  editor.insertText('\t');
		}
	  }

	return (
		<>
			<Slate editor={editor} value={initialValue}>
				<div className="my-12 mx-auto w-[85vw] border-[1px] border-editor-border bg-editor">
					<div>
						<Toolbar editor={editor} openModal={openModal} />
					</div>
					<div className="max-h-[40rem] overflow-y-auto">
						<Editable
							id="editable"
							className="my-4 mx-auto min-h-[29.7cm] w-[21cm] overflow-hidden border-[1px] border-editable-border bg-editable p-4"
							editor={editor}
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							spellCheck
							autoFocus						
							onKeyDown={event => onKeyDown(event)}
							/>
					</div>
				</div>
			</Slate>

			<ModalFactory
				type={modalType}
				editor={editor}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				openModal={openModal}
			/>
		</>
	);
}

// Define a React component to render leaves with bold text.

const DefaultElement = (props) => {
	return <p {...props.attributes} >{props.children}</p>;
};
