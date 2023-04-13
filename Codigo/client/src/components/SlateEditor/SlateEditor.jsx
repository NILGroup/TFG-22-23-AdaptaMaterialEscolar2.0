// Importamos dependencias react
import React, { useCallback, useMemo, useState } from "react";

// Importamos la factoria de slate
import { createEditor } from "slate";

// Importamos los componentes de slate y los plugigs de react
import { Editable, Slate, withReact } from "slate-react";
import Definition from "./elements/Definition/Definition";
import Desarrollo from "./elements/Desarrollo/Desarrollo";
import ImageElement from "./elements/ImageElement/ImageElement";
import Linea from "./elements/Linea/Linea";
import Toolbar from "./Toolbar/Toolbar";

import { ModalFactory } from "../Modal/ModalFactory";

import DrawingSpace from "./elements/DrawingSpace/DrawingSpace";
import Icon from "./elements/Icon/Icon";
import Leaf from "./elements/Leaf/Leaf";
import PictotranslatorElement from "./elements/PictotranslatorElement/PictotranslatorElement";
import RelateConcepts from "./elements/RelateConcepts/RelateConcepts";
import Staff from "./elements/Staff/Staff";
import Table from "./elements/Table/Table";
import Td from "./elements/Table/Td";
import Tr from "./elements/Table/Tr";
import VerdaderoFalso from "./elements/VerdaderoFalso/VerdaderoFalso";
import { withEmbeds } from "./plugins/withEmbeds";
import { withTable } from "./plugins/withTable";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

export default function SlateEditor() {
	// Creamos el objeto editor de slate
	const editor = useMemo(() => withTable(withEmbeds(withReact(createEditor()))), []);

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
			case "desarrollo":
				return <Desarrollo {...props} />;
			case "embeds":
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
			case "list":
				return <VerdaderoFalso {...props} />;
			case "pictotranslator":
				return <PictotranslatorElement {...props} openModal={openModal} />;
			case "relateConcepts":
				return <RelateConcepts {...props} openModal={openModal} />;
			case "drawingSpace":
				return <DrawingSpace {...props} />;
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

	// Tipo de modal [tipo actual, cambiar el tipo de modal]
	const [modalData, setModalData] = useState(null);

	// Funcion auxiliar para abrir el modal de un tipo especifico
	const openModal = (modalType, data = undefined) => {
		setIsOpen(true);
		setModalType(modalType);
		setModalData(data);
	};

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
							editor={editor}
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							className="my-4 mx-auto min-h-[29.7cm] w-[21cm] overflow-hidden border-[1px] border-editable-border bg-editable p-4"
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
				data={modalData}
			/>
		</>
	);
}

// Define a React component to render leaves with bold text.

const DefaultElement = (props) => {
	return <p {...props.attributes}>{props.children}</p>;
};
