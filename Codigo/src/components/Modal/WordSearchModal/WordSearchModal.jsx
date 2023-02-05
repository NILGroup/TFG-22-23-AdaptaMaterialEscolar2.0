import { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import Modal from "../Modal";
import style from "../Modal.module.css";
import ModalPreview from "../ModalPreview";
import WordListItem from "./WordListItem";
import WordSearchGrid from "./WordSearchGrid";

import { generateOptionsObject, createWordSearch } from "./WordSearchUtils";

export default function WordSearchModal({ isOpen, onClose }) {
    const DEFAULT_NUM_ROWS = 1;
    const DEFAULT_NUM_COLS = 1;
    const DEFAULT_WORD_LIST = [];
    const DEFAULT_DIRECTIONS = { horizontal: true, vertical: true, diagonal: true, backwards: false };
    const DEFAULT_WORD_SEARCH_GRID = null;

    const [numRows, setNumRows] = useState(DEFAULT_NUM_ROWS);
    const [numCols, setNumCols] = useState(DEFAULT_NUM_ROWS);
    const [wordList, setWordList] = useState(DEFAULT_WORD_LIST);
    const [directions, setDirections] = useState(DEFAULT_DIRECTIONS);
    const [wordSearchGrid, setWordSearchGrid] = useState(DEFAULT_WORD_SEARCH_GRID);

    const addWordToList = (word) => {
        const wordToAdd = word.replace(/\s/g, "");

        if (!wordList)
            setWordList([wordToAdd]);
        else
            setWordList((previousWordList) => [...previousWordList, wordToAdd]);
    };

    const deleteWord = (index) => {
        if (!wordList)
            throw new Error("Cannot delete word, word list does not exist!");

        if (index < 0 || index >= wordList.length)
            throw new Error("Cannot delete word, index out of range!");

        setWordList((previousWordList) => previousWordList.filter((word, wordIndex) => wordIndex !== index));
    }

    const editWord = (newValue, index) => {
        if (!wordList)
            throw new Error("Cannot update word, word list does not exist!");

        if (index < 0 || index >= wordList.length)
            throw new Error("Cannot update word, index out of range!");

        setWordList((previousWordList) => previousWordList.map((word, wordIndex) => (wordIndex === index ? String(newValue) : word)));
    }

    const closeModal = () => {
        setNumRows(DEFAULT_NUM_ROWS);
        setNumCols(DEFAULT_NUM_COLS);
        setWordList(DEFAULT_WORD_LIST);
        setDirections(DEFAULT_DIRECTIONS)
        setWordSearchGrid(DEFAULT_WORD_SEARCH_GRID);

        onClose();
    }

    useEffect(() => {
        const options = generateOptionsObject(numRows, numCols, directions);
        const wordSearch = createWordSearch(wordList, options);

        setWordSearchGrid(wordSearch.data.grid);
    }, [numRows, numCols, wordList, directions]);

    return (
        <Modal title={"Sopa de Letras"} isOpen={isOpen} onClose={closeModal}>
            <div className={style.modalForm}>
                <div className={style.modalFormGroup}>
                    <h4 className={style.modalHeading}>Tamaño</h4>
                    <div className={style.modalInlineFormGroup}>
                        <label htmlFor="numRows">Número de filas</label>
                        <input type="number" id="numRows" name="numRows" min="1" value={numRows} onChange={(e) => setNumRows(e.target.value)} />
                    </div>
                    <div className={style.modalInlineFormGroup}>
                        <label htmlFor="numCols">Número de columnas</label>
                        <input type="number" id="numCols" name="numCols" min="1" value={numCols} onChange={(e) => setNumCols(e.target.value)} />
                    </div>
                </div>
                <div className={style.modalWordSearchGrid}>
                    <div className={style.modalGridCol}>
                        <h4 className={style.modalHeading}>Palabras</h4>
                        <form className={style.modalFormGroup} onSubmit={(e) => {
                            e.preventDefault();

                            const newWord = e.target.newWord.value;
                            addWordToList(newWord);

                            e.target.reset();
                        }}>
                            <div className={style.modalInlineFormGroup}>
                                <input type="text" name="newWord" id="newWord" className={style.modalInput} required />
                                <button type="submit" className={style.modalIconButton}><AiOutlinePlus size={22} /></button>
                            </div>
                        </form>
                        <ul className={style.modalWordList}>
                            {wordList && wordList.map((word, index) => {
                                return (
                                    <WordListItem key={`word-${index}`} word={word} index={index} onEdit={(newValue, index) => editWord(newValue, index)} onDelete={() => deleteWord(index)} />
                                );
                            })}
                        </ul>
                    </div>
                    <div className={style.modalGridCol}>
                        <ModalPreview>
                            <p>Encuentra {wordList?.length === 1 ? "la palabra" : `las ${wordList?.length ?? 0} palabras`}: </p>
                            <WordSearchGrid wordSearchGrid={wordSearchGrid} />
                        </ModalPreview>
                        <div>
                            {/* TODO: Botones de direccion
                            <button>Hola</button>
                            <button>Hola</button>
                            <button>Hola</button>
                            <button>Hola</button> */}
                        </div>
                    </div>
                </div>
                <button className={`${style.modalButton} ${style.modalCenter}`}>Ok</button>
            </div>
        </Modal>
    );
}


