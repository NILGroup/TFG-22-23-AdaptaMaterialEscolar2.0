import { useState } from "react";

import {ModalType, ModalFactory} from "../../Modal/ModalFactory";

const SearchPicto = () => <span>BP</span>;
const WordSearch = () => <span>SL</span>;

export default function Toolbar() {
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
      <div id="toolbar">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">
            Arial
          </option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">
            Size 3
          </option>
          <option value="large">Size 4</option>
        </select>
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
        <button className="ql-clean" />
        <button className="ql-searchPicto" onClick={() => openModal(ModalType.searchPicto)}>
          <SearchPicto />
        </button>
        <button className="ql-wordSearch" onClick={() => openModal(ModalType.wordSearch)}>
          <WordSearch />
        </button>
      </div>
      <ModalFactory isOpen={isOpen} onClose={() => setIsOpen(false)} type={modalType} />
    </>
  );
}
