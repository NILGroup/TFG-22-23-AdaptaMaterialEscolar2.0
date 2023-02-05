import { toggleBoldMark } from "../../utils/SlateFunction";

import ToolbarGroupButton from "./ToolbarGroupButton";

import { AiOutlineBold } from "react-icons/ai";

export default function ToolbarFormatGroup({ editor, openModal }) {
    return (
        <>
            <ToolbarGroupButton onClick={() => toggleBoldMark(editor)}><AiOutlineBold /></ToolbarGroupButton>
        </>
    );
}