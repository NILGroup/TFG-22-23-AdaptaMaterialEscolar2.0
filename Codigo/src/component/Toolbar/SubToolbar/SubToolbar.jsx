import { useState } from "react";
import {toggleCodeBlock, toggleBoldMark} from "../../../utils/SlateFunction"
import Icon from "../../common/Icon";
import {ModalType, ModalFactory} from "../../Modal/ModalFactory";
import style from "./SubToolbar.module.css"

//Esto es una prueba, mejor crear una factoria de subtoolbars 
export default function Subtoolbar ({editor}) {
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
            <div className={style.toolbar_function}>
                    <button  className={style.function_buttons} onMouseDown={event => {
                        event.preventDefault()
                        toggleBoldMark(editor)
                    }}>
                        <Icon icon="bold"/>
                    </button>
                    <button className={style.function_buttons}
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleCodeBlock(editor)
                    }}>
                    Code Block
                    </button>
                    <button className={style.function_buttons}
                    onMouseDown={event => {
                        event.preventDefault()
                        openModal(ModalType.searchPicto)
                    }}>
                    BP
                    </button>
            </div>
            <ModalFactory editor={editor} isOpen={isOpen} onClose={() => setIsOpen(false)} type={modalType} />
        </>
    )
}