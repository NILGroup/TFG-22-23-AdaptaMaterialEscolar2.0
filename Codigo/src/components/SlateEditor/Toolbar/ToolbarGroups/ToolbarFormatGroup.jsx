import { toggleBoldMark } from "../../utils/SlateFunction";

import { ModalType } from "../../../Modal/ModalFactory";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold } from "react-icons/ai";

export default function ToolbarFormatGroup({ editor, openModal }) {
    return (
        <>
            <ToolbarGroupButton onClick={() => toggleBoldMark(editor)}><AiOutlineBold /></ToolbarGroupButton>
            <ToolbarGroupButton onClick={() => openModal(ModalType.searchPicto)}><span>BP</span></ToolbarGroupButton>
        </>
    );
}