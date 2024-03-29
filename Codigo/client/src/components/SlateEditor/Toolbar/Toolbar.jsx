import React, { useState } from "react";

import ToolbarButton from "./ToolbarButton";
import { ToolbarGroup, ToolbarGroupFactory } from "./ToolbarGroups/ToolbarGroupFactory";

export default function Toolbar({ editor, openModal }) {
	const [activeToolbarGroup, setActiveToolbarGroup] = useState(ToolbarGroup.format);

	return (
		<>
			<div className="flex flex-col font-main">
				<div className="flex flex-wrap gap-8 border-b-[1px] border-editor-border bg-editor-toolbar py-2 px-4">
					{/* Archivo */}
					<ToolbarButton
						text="Archivo"
						onClick={setActiveToolbarGroup}
						toolbarGroup={ToolbarGroup.file}
						activeGroup={activeToolbarGroup}
					/>
					{/* Formato */}
					<ToolbarButton
						text="Formato"
						onClick={setActiveToolbarGroup}
						toolbarGroup={ToolbarGroup.format}
						activeGroup={activeToolbarGroup}
					/>
					{/* Ejercicios */}
					<ToolbarButton
						text="Ejercicios"
						onClick={setActiveToolbarGroup}
						toolbarGroup={ToolbarGroup.exercises}
						activeGroup={activeToolbarGroup}
					/>
					{/* Texto */}
					<ToolbarButton
						text="Texto"
						onClick={setActiveToolbarGroup}
						toolbarGroup={ToolbarGroup.text}
						activeGroup={activeToolbarGroup}
					/>
				</div>
				<div className="flex grid-rows-4 flex-wrap items-center justify-start gap-x-2 gap-y-1 whitespace-nowrap border-b-[1px] border-editor-border bg-editor-subtoolbar p-2">
					<ToolbarGroupFactory type={activeToolbarGroup} editor={editor} openModal={openModal} />
				</div>
			</div>
		</>
	);
}
