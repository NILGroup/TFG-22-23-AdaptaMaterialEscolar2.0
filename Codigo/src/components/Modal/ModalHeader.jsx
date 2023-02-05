import { IoCloseSharp } from "react-icons/io5"

import style from "./Modal.module.css";

export default function ModalHeader({ title, onClose }) {
    return (
        <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>{title}</h3>
            <button className={style.modalClose} onClick={onClose}><IoCloseSharp /></button>
        </div>
    );
}
