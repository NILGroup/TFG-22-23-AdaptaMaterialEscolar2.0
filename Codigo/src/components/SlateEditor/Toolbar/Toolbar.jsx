import { useState } from "react";

import { ToolbarGroup, ToolbarGroupFactory } from "./ToolbarGroups/ToolbarGroupFactory";
import ToolbarButton from "./ToolbarButton";

import style from "./Toolbar.module.css"
import toolbarButtonStyle from "./ToolbarButton.module.css";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Toolbar({ editor, openModal }) {
    const [anchorElement, setAnchorElement] = useState(null);
    const [activeToolbarGroup, setActiveToolbarGroup] = useState(ToolbarGroup.format);

    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleExportPDF = () => {
        setAnchorElement(null);
        alert("Exportar a PDF");
    };

    const handleExportWord = () => {
        setAnchorElement(null);
        alert("Exportar a WORD");
    };

    const handleImportDocument = () => {
        setAnchorElement(null);
        alert("Importar documento");
    };

    return (
        <>
            <div className={style.toolbar}>
                <div className={style.mainToolbar}>
                    {/* Archivo */}
                    <button className={toolbarButtonStyle.toolbarButton} onClick={(e) => setAnchorElement(e.currentTarget)}>Archivo</button>
                    <Menu open={anchorElement !== null} anchorEl={anchorElement} onClose={handleClose}>
                        <MenuItem onClick={handleExportPDF}>Exportar a PDF</MenuItem>
                        <MenuItem onClick={handleExportWord}>Exportar a WORD</MenuItem>
                        <MenuItem onClick={handleImportDocument}>Importar documento</MenuItem>
                    </Menu>
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