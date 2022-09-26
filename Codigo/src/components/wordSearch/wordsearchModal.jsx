import "./wordsearch.styles.scss";
import React from 'react';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentDocument } from "../../redux/document/document.selectors";
import { closeWordSearchModal, updateWordSearchRows, updateWordSearchCols, updateWordSearchDictionary, updateWordSearchDiagonal, updateWordSearchHorizontal, 
    updateWordSearchVertical, updateWordSearchMaxWords, updateWordSearchActivateBackwards,
    updateWordSearchBackWardsProbability, resetWordSearch, createWordSearch, updateWordSearchError,
    updateWordSearchHiddenWords, updateWordSearchReadyToPreview, addMoreDictionary, deleteDictionary, updateAddHowToSolve, updateWordSearchReadyToPreviewForce} from "../../redux/wordSearch/wordsearch.actions";
import { selectWordSearchModalRows, selectWordSearchModalCols, selectWordSearchModalDictionary, selectWordSearchModalVertical, selectWordSearchModalHorizontal, 
    selectWordSearchModalDiagonal, selectWordSearchModalMaxWords, selectWordSearchModalActivateBackwards, 
    selectWordSearchModalBackwardsProbability, selectWordSearchModalError, selectWordSearchModalHiddenWords, selectWordSearchModalWordSearchObj, selectWordSearchModalReadyToPreview, selectWordSearchModalAddHowToSolve} from "../../redux/wordSearch/wordsearch.selectors";

import WordSearch from "../wordSearch/wordSearch";
import { selectEditorClass } from "../../redux/editor/editor.selectors";
//Icons
import { IoMdClose } from "react-icons/io";
import {GoPlus, GoDash} from 'react-icons/go';
import { FcInfo } from 'react-icons/fc';

class WordSearchModal extends React.Component{
    constructor(props){
        super();
        this.onChange = this.onChange.bind(this);
        this.state ={
            disableTip: false,
            disableDrag: true
        }

        this.dragRef = React.createRef();
        /* To manage the focus in the inputs */
        this.nameInputs = [];
        this.focus = null;
    }

    /* Disables the hint when the user has hovered the mouse over the modal header */
    disableTip = () =>{
        this.setState({
            disableTip: true
        });
    }

    /* Activates the drag function only when the user holds down the left-click on the modal header */
    toggleDisableDrag = () =>{
        this.setState({
            disableDrag: !this.state.disableDrag
        });
    }

    async generateWordSearch(){
        this.props.createWordSearch();
        this.props.updateError();
    }

    preview = () =>{
        this.generateWordSearch();
        this.props.updateReadyToPreview();
    }

    accept = async () => {
        this.props.updateForceReadyToPreview(false);
        if(this.props.wordSearchObject !== null){
            if(this.props.error !== ''){
                await this.generateWordSearch();
            }
        }
        else{
            await this.generateWordSearch();
        }

        this.writeInEditor();
    }


    writeInEditor(){
        if(this.props.wordSearchObject !== null && this.props.error === ''){
            this.props.editor.execute( 'insertWordSearch',  {grid: this.props.wordSearchObject.grid, words: this.props.wordSearchObject.words, showWords: this.props.hiddenWords, addHowToSolve: this.props.addHowToSolve, rows: parseInt(this.props.rows), columns: parseInt(this.props.cols)} );
            this.props.editor.editing.view.focus();
            this.props.closeModal();
            this.props.resetWordSearch();
        }
    }

    /* Manages calls to the dispatcher to update data */
    onChange(e){
        switch(e.target.name){
            case "rows":
                this.props.updateRows(e.target.value);
                break;
            case "cols":
                this.props.updateCols(e.target.value);
                break;
            case "vertical":
                this.props.updateVertical(e.target.checked);
                break;
            case "horizontal":
                this.props.updateHorizontal(e.target.checked);
                break;
            case "diagonal":
                this.props.updateDiagonal(e.target.checked);
                break;
            case "maxWords":
                this.props.updateMaxWords(e.target.value);
                break;
            case "activateBackwards":
                this.props.updateActivateBackwards(e.target.checked);
                break;
            case "backwardsProbability":
                this.props.updateBackwardsProbability(e.target.value);
                break;
            case "hiddenWords":
                this.props.updateHiddenWords(e.target.checked);
                break;
            case "addHowToSolve":
                this.props.updateAddHowToSolve(e.target.checked);
                break;
            default:
                break;
        }
    }

    /* Manages call to the dispatcher to update dictionary data */
    handleChangeDictionary(e, i){
        this.props.updateDictionary(e.target.value, i);
    }

    handleKeyDown = (e) =>{
        if(e.keyCode === 13){ //enter
            this.props.addMoreDictionary();
        }
    }

    /* Manages row removal and input focus on deletion */
    handleRemoveRow = (i) =>{
        if(!this.focus.name.startsWith("text")){
            this.focus = this.nameInputs[i-1];
        }
        else{
            if(this.focus.name > this.nameInputs[i].name)
            this.focus = this.nameInputs[this.focus.name.charAt(this.focus.name.length - 1)-1];
            else {
            if(this.focus.name === this.nameInputs[i].name && i === this.nameInputs.length - 1)
                this.focus = this.nameInputs[i-1];
            }
        }
        
        this.props.deleteDictionary(i);
        this.nameInputs = [...this.nameInputs.slice(0,i), ...this.nameInputs.slice(i+1)];
    }
    
    /* Manages the focus of the inputs when there is a change in the dictionary */
    componentDidUpdate(prevProps){
        this.nameInputs = this.nameInputs.filter(item => item !== null); //HACK: after removing, there is a null at last pos
        if(this.props.dictionary.length > prevProps.dictionary.length){
            this.focus = this.nameInputs[this.props.dictionary.length-1];
            this.focus.focus();
        }
        else if(this.props.dictionary.length < prevProps.dictionary.length){
            this.focus.focus();
        }
        else if(this.props.rows !== prevProps.rows && this.props.rows === ""){
            this.nameRows.focus();
        }
    }

    componentDidMount(){
        this.nameRows.focus();
    }
    
    handleFocus = (i) =>{
        this.focus = this.nameInputs[i];
    }

    render(){
        return(
            <Draggable nodeRef={this.dragRef} bounds="body" disabled={this.state.disableDrag}>
                <div ref={this.dragRef} className="wordsearchModal">
                    <div className="wordsearchModal__content">
                        <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalWordSearchTip">
                        <ReactTooltip id="modalWordSearchTip" place="top" effect="solid" delayHide={2000} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>¡Puedes arrastrar esta ventana a cualquier parte si mantienes pulsada la parte superior de la misma!</ReactTooltip>
                            <button onClick={this.props.closeModal}><IoMdClose size="1.2em"/></button>
                        </div>
                        <div className="wordsearchModal__content__main">
                            <div className="wordsearchModal__content__main__container">
                                <div className="container__info">
                                    <span>* Campos obligatorios</span>
                                </div>
                                <div className="container__configTable">
                                    <label><span>*</span>Filas</label> <input ref={(input) => {this.nameRows = input;}} name="rows" type="number" min="1" onChange={this.onChange} value={this.props.rows}/>
                                    <label><span>*</span>Columnas</label> <input name="cols" type="number" min="1" onChange={this.onChange} value={this.props.cols}/>
                                    <label>Palabras máximas <FcInfo data-tip data-for="maxWordsTip"/><ReactTooltip id="maxWordsTip" place="top" effect="solid">
                                        Número máximo de palabras que se insertarán en la sopa de letras. Por defecto es 20.
                                        </ReactTooltip></label> <input name="maxWords" type="number" min="1" onChange={this.onChange} value={this.props.maxWords}/>
                                </div>
                                <div className="container__words">
                                    <label><span>*</span>Escribe las palabras a buscar (una por recuadro):<FcInfo data-tip data-for="dictionaryTip"/><ReactTooltip id="dictionaryTip" place="top" effect="solid">
                                        Puedes añadir más filas pulsando la tecla enter dentro de los recuadros
                                        </ReactTooltip></label>
                                    <div className="container__words__inputs">
                                    {this.props.dictionary.map((el, i) =>{
                                        return(
                                        <div key={"ws-" + i} className="container__words__text">
                                            <input ref={(input) => {this.nameInputs[i] = input;}} type="text" name={"text"+i} autoComplete="off" value={el} onChange={(e) =>{ this.handleChangeDictionary(e, i)}} onKeyDown={this.handleKeyDown} onFocus={() => this.handleFocus(i)}/>
                                            <button data-tip data-for="addTip" className="add" onClick={this.props.addMoreDictionary}><GoPlus color="white" size="1.3em"/><ReactTooltip id="addTip" place="top" effect="solid">Añadir más palabras</ReactTooltip></button>
                                            {<button data-tip data-for="deleteTip" className="delete" disabled={this.props.dictionary.length === 1} onClick={() => {this.handleRemoveRow(i)}}><GoDash color="white" size="1.3em"/><ReactTooltip id="deleteTip" place="top" effect="solid">Quitar palabra</ReactTooltip></button>}
                                        </div>
                                    )})}
                                    </div>
                                    
                                </div>
                                <div className="container__searchWords">
                                    <label><span>*</span>Buscar palabras en:</label>
                                    <div className="container__searchWordsOptions">
                                        <label><input id="vertical" type="checkbox" name="vertical" onChange={this.onChange} checked={this.props.vertical}/>Vertical</label> 
                                        <label><input id="horizontal" type="checkbox" name="horizontal" onChange={this.onChange} checked={this.props.horizontal}/>Horizontal</label> 
                                        <label><input id="diagonal" type="checkbox" name="diagonal" onChange={this.onChange} checked={this.props.diagonal}/>Diagonal</label>
                                    </div>
                                </div>
                                <div className="container__backwards">
                                    <label><input id="activateBackwards" type="checkbox" name="activateBackwards" onChange={this.onChange} checked={this.props.activateBackwards}/>Activar escritura al revés <FcInfo data-tip data-for="activateBackwardsProbTip"/><ReactTooltip id="activateBackwardsProbTip" place="top" effect="solid">
                                        Activa la probabilidad que tiene cada palabra de escribirse al revés
                                        </ReactTooltip></label>
                                        {this.props.activateBackwards ?
                                        <div className="container__backwards__activateBackwards">
                                            <label>Probabilidad de escribir cada palabra al revés <FcInfo data-tip data-for="backwardsProbTip"/><ReactTooltip id="backwardsProbTip" place="top" effect="solid">
                                            Esta probabilidad es independiente para cada palabra. Por defecto es 0,3.
                                            </ReactTooltip></label>
                                            <input type="range" min="0.1" max="1.0" value={this.props.backwardsProbability} step="0.1" id="backwardsProbability" name="backwardsProbability" onChange={this.onChange}/>{this.props.backwardsProbability}
                                        </div>
                                        :
                                        null
                                        }
                                </div>
                                <div className="container__showWords">
                                    <label><input id="hiddenWords" type="checkbox" name="hiddenWords" onChange={this.onChange} checked={this.props.hiddenWords}/>Mostrar en el ejercicio las palabras a buscar</label>
                                </div>
                                <div className="container__addHowToSolve">
                                    <label><input id="addHowToSolve" type="checkbox" name="addHowToSolve" onChange={this.onChange} checked={this.props.addHowToSolve}/>Añadir ejemplo de cómo resolver el ejercicio</label>
                                </div>

                                {this.props.error !== '' ?
                                    <div id="errorMessages" className="container__error">
                                        {this.props.error}
                                    </div>
                                :
                                null}   
                                
                                {this.props.readyToPreview ?
                                <div id="wordsearch-preview" className="container__preview">
                                    <div className="preview">Vista previa</div>
                                    <div className="board">
                                        {this.props.wordSearchObject !== null ?
                                         <WordSearch data={this.props.wordSearchObject}/>
                                        :
                                        null}
                                    </div>
                                </div>
                                :
                                null}
                                
                            </div>
                        </div>
                        <div className="footer">
                            <button className="reset" onClick={this.props.resetWordSearch}>Resetear</button>
                            <button className="previewView" onClick={this.preview} disabled={!this.props.rows || !this.props.cols || this.props.dictionary.filter(def => def === "").length > 0 || (!this.props.vertical && !this.props.horizontal && !this.props.diagonal)}>Vista previa</button>
                            <button className="accept" onClick={this.accept} disabled={!this.props.rows || !this.props.cols || this.props.dictionary.filter(def => def === "").length > 0 || (!this.props.vertical && !this.props.horizontal && !this.props.diagonal)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </Draggable>
            
        );
    }
}

/* Functions to execute (modify redux) */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeWordSearchModal()),
    updateRows: (rows) => dispatch(updateWordSearchRows(rows)),
    updateCols: (cols) => dispatch(updateWordSearchCols(cols)),
    updateDictionary: (dictionary, index) => dispatch(updateWordSearchDictionary(dictionary, index)),
    updateVertical: (vertical) => dispatch(updateWordSearchVertical(vertical)),
    updateHorizontal: (horizontal) => dispatch(updateWordSearchHorizontal(horizontal)),
    updateDiagonal: (diagonal) => dispatch(updateWordSearchDiagonal(diagonal)),
    updateMaxWords: (maxWords) => dispatch(updateWordSearchMaxWords(maxWords)),
    updateActivateBackwards: (activateBackwards) => dispatch(updateWordSearchActivateBackwards(activateBackwards)),
    updateBackwardsProbability: (backwardsProbability) => dispatch(updateWordSearchBackWardsProbability(backwardsProbability)),
    resetWordSearch: () => dispatch(resetWordSearch()),
    createWordSearch: () => dispatch(createWordSearch()),
    updateError: () => dispatch(updateWordSearchError()),
    updateHiddenWords: (hiddenWords) => dispatch(updateWordSearchHiddenWords(hiddenWords)),
    updateReadyToPreview: () => dispatch(updateWordSearchReadyToPreview()),
    addMoreDictionary: () => dispatch(addMoreDictionary()),
    deleteDictionary: (index) => dispatch(deleteDictionary(index)),
    updateAddHowToSolve: (add) => dispatch(updateAddHowToSolve(add)),
    updateForceReadyToPreview: (force) => dispatch(updateWordSearchReadyToPreviewForce(force))
});

/* Data (read redux) */
const mapStateToProps = createStructuredSelector({
    file: selectCurrentDocument,
    rows: selectWordSearchModalRows,
    cols: selectWordSearchModalCols,
    dictionary: selectWordSearchModalDictionary,
    vertical: selectWordSearchModalVertical,
    horizontal: selectWordSearchModalHorizontal,
    diagonal: selectWordSearchModalDiagonal,
    maxWords: selectWordSearchModalMaxWords,
    activateBackwards: selectWordSearchModalActivateBackwards,
    backwardsProbability: selectWordSearchModalBackwardsProbability,
    error: selectWordSearchModalError,
    wordSearchObject: selectWordSearchModalWordSearchObj,
    hiddenWords: selectWordSearchModalHiddenWords,
    readyToPreview: selectWordSearchModalReadyToPreview,
    addHowToSolve: selectWordSearchModalAddHowToSolve,
    editor: selectEditorClass,
});

export default connect(mapStateToProps, mapDispatchToProps)(WordSearchModal);