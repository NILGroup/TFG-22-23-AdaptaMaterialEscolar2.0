import "./toolbar.styles.scss";
import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalIsDisplayed } from '../../redux/pictograms/pictogram.selectors';
import {closePictogramFinder, openPictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { closeWordSearchModal, openWordSearchModal } from '../../redux/wordSearch/wordsearch.actions';
import { selectWordSearchModalIsDisplayed } from '../../redux/wordSearch/wordsearch.selectors';
import PictogramSearchModal from '../pictogramSearchModal/pictogramSearchModal';
import WordSearchModal from '../wordSearch/wordsearchModal';
import { closeTrueFalseModal, openTrueFalseModal } from "../../redux/trueFalse/trueFalse.actions";
import { selectTrueFalseModalIsDisplayed } from "../../redux/trueFalse/trueFalse.selectors";
import TrueFalseModal from "../exerciseTrueFalse/trueFalseModal";
import DefinitionsModal from "../exerciseDefinitions/definitionsModal";
import DevelopModal from "../exerciseDevelop/developModal";
import { selectToolbarLastOpened } from "../../redux/toolbar/toolbar.selectors";
import { updateLastOpened } from "../../redux/toolbar/toolbar.actions";
import { closeFillGapsModal, openFillGapsModal } from "../../redux/fillGaps/fillgaps.actions";
import { selectFillGapsModalIsDisplayed } from "../../redux/fillGaps/fillgaps.selectors";
import FillGapsModal from "../fillGaps/fillGapsModal";
import { closeDefinitionsModal, openDefinitionsModal } from "../../redux/definitions/definitions.actions";
import { closeDevelopModal, openDevelopModal } from "../../redux/develop/develop.actions";
import { selectDefinitionsModalIsDisplayed } from "../../redux/definitions/definitions.selectors";
import { selectDevelopModalIsDisplayed } from "../../redux/develop/develop.selectors";

class Toolbar extends React.Component{
    
    /* Manages modal opening */
    handleClick = (e) =>{
        this.closeModal();
        this.props.updateLastOpened(e.target.name);
        switch(e.target.name){
            case "pictograms":
                this.props.openPictogramFinder();
                break;
            case "definitions":
                this.props.openDefinitionsModal();
                break;
            case "develop":
                this.props.openDevelopModal();
                break;
            case "wordsearch":
                this.props.openWordSearchModal();
                break;
            case "truefalse":
                this.props.openTrueFalseModal();
                break;
            case "fillGaps":
                this.props.openFillGapsModal();
                break;
            default:
                break;
        }
    }

    /* Manages modal closing */
    closeModal(){
        switch(this.props.lastOpened){
            case "pictograms":
                if(this.props.showPictogramsModal)
                    this.props.closePictogramFinder();
                break;
            case "definitions":
                if(this.props.showDefinitionsModal)
                    this.props.closeDefinitionsModal();
                break;
            case "develop":
                if(this.props.showDevelopModal)
                    this.props.closeDevelopModal();
                break;
            case "wordsearch":
                if(this.props.showWordSearchModal)
                    this.props.closeWordSearchModal();
                break;
            case "truefalse":
                if(this.props.showTrueFalseModal)
                    this.props.closeTrueFalseModal();
                break;
            case "fillGaps":
                if(this.props.showFillGapsModal)
                    this.props.closeFillGapsModal()
                break;
            default:
                break;
        }
    }

    render(){
        return (
        <div className="toolbar">
            <div className="toolbar-self">
                <button name="pictograms" className={this.props.showPictogramsModal ? "pictograms-active" : null} onClick={this.handleClick}>Pictogramas</button>
                <button name="fillGaps" className={this.props.showFillGapsModal ? "fillGaps-active" : null} onClick={this.handleClick}>Completar huecos</button>
                <button name="definitions" className={this.props.showDefinitionsModal ? "definitions-active" : null} onClick={this.handleClick}>Definiciones</button>
                <button name="develop" className={this.props.showDevelopModal ? "develop-active" : null} onClick={this.handleClick}>Desarrollo</button>
                <button name="wordsearch" className={this.props.showWordSearchModal ? "wordsearch-active" : null} onClick={this.handleClick}>Sopa de letras</button>
                <button name="truefalse" className={this.props.showTrueFalseModal ? "truefalse-active" : null} onClick={this.handleClick}>V/F</button>
            </div>
            <div className="modal-box">
                { this.props.showPictogramsModal ? <PictogramSearchModal/> : null}
                { this.props.showWordSearchModal ? <WordSearchModal/> : null}
                { this.props.showDefinitionsModal ? <DefinitionsModal/> : null}
                { this.props.showDevelopModal ? <DevelopModal/> : null}
                { this.props.showTrueFalseModal ? <TrueFalseModal/> : null}
                { this.props.showFillGapsModal ? <FillGapsModal/> : null}
            </div>
        </div>)
    }
}

/* Functions to execute (modify redux) */
const mapDispatchToProps = (dispatch) => ({
    openPictogramFinder: () => dispatch(openPictogramFinder()),
    openWordSearchModal: () => dispatch(openWordSearchModal()),
    openTrueFalseModal: () => dispatch(openTrueFalseModal()),
    openDefinitionsModal: () => dispatch(openDefinitionsModal()),
    openDevelopModal: () => dispatch(openDevelopModal()),
    closePictogramFinder: () => dispatch(closePictogramFinder()),
    closeWordSearchModal: () => dispatch(closeWordSearchModal()),
    closeTrueFalseModal: () => dispatch(closeTrueFalseModal()),
    closeDefinitionsModal: () => dispatch(closeDefinitionsModal()),
    closeDevelopModal: () => dispatch(closeDevelopModal()),
    updateLastOpened: (last) => dispatch(updateLastOpened(last)),
    openFillGapsModal: () => dispatch(openFillGapsModal()),
    closeFillGapsModal: () => dispatch(closeFillGapsModal())
});

/* Data (read redux) */
const mapStateToProps = createStructuredSelector({
    showPictogramsModal: selectModalIsDisplayed,
    showWordSearchModal: selectWordSearchModalIsDisplayed,
    showTrueFalseModal: selectTrueFalseModalIsDisplayed,
    showDefinitionsModal: selectDefinitionsModalIsDisplayed,
    showDevelopModal: selectDevelopModalIsDisplayed,
    lastOpened: selectToolbarLastOpened,
    showFillGapsModal: selectFillGapsModalIsDisplayed
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);