import { ModalType } from "../../../Modal/ModalFactory";

import ToolbarGroupButton from "./ToolbarGroupButton";

export default function ToolbarFormatGroup({ editor, openModal }) {
    return (
        <>
            <ToolbarGroupButton onClick={() => openModal(ModalType.fillBlanks)}><span>CH</span></ToolbarGroupButton>
            <ToolbarGroupButton onClick={() => openModal(ModalType.wordSearch)}><span>SL</span></ToolbarGroupButton>
        </>
    );
}