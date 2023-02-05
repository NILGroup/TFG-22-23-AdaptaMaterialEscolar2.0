import { ModalType } from "../../../Modal/ModalFactory";

import ToolbarGroupButton from "./ToolbarGroupButton";

export default function ToolbarTextGroup({ editor, openModal }) {
    return (
        <>
            <ToolbarGroupButton onClick={() => openModal(ModalType.searchPicto)}><span>Buscar Pictograma</span></ToolbarGroupButton>
        </>
    );
}