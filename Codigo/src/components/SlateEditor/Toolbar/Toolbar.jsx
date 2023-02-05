import { useState } from "react";

import { ToolbarGroup, ToolbarGroupFactory } from "./ToolbarGroups/ToolbarGroupFactory";
import ToolbarButton from "./ToolbarButton";

import style from "./Toolbar.module.css"


export default function Toolbar({ editor, openModal }) {
    const [activeToolbarGroup, setActiveToolbarGroup] = useState(ToolbarGroup.format);

    return (
        <>
            <div className={style.toolbar}>
                <div className={style.mainToolbar}>
                    {/* Archivo */}
                    <ToolbarButton
                        text={"Archivo"}
                        onClick={setActiveToolbarGroup}
                        toolbarGroup={ToolbarGroup.file}
                        activeGroup={activeToolbarGroup}
                    />
                    {/* Formato */}
                    <ToolbarButton
                        text={"Formato"}
                        onClick={setActiveToolbarGroup}
                        toolbarGroup={ToolbarGroup.format}
                        activeGroup={activeToolbarGroup}
                    />
                    {/* Ejercicios */}
                    <ToolbarButton
                        text={"Ejercicios"}
                        onClick={setActiveToolbarGroup}
                        toolbarGroup={ToolbarGroup.exercises}
                        activeGroup={activeToolbarGroup}
                    />
                    {/* Texto */}
                    <ToolbarButton
                        text={"Texto"}
                        onClick={setActiveToolbarGroup}
                        toolbarGroup={ToolbarGroup.text}
                        activeGroup={activeToolbarGroup}
                    />
                </div>
                <div className={style.subToolbar}>
                    <ToolbarGroupFactory type={activeToolbarGroup} editor={editor} openModal={openModal} />
                </div>
            </div>
        </>
    );
}