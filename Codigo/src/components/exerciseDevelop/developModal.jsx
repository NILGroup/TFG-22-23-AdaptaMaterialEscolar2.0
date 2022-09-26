import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeDevelopModal, resetDevelopModal, updateDevelopAddHowToSolve, updateDevelopExtraSpace, updateDevelopNumLines, updateDevelopText } from '../../redux/develop/develop.actions';
import { selectDevelopAddHowToSolve, selectDevelopExtraSpace, selectDevelopNumLines, selectDevelopText} from "../../redux/develop/develop.selectors";
import './develop.scss'
import Draggable from 'react-draggable';
import ReactTooltip from "react-tooltip";
import { selectEditorClass } from '../../redux/editor/editor.selectors';
//Icons
import { IoMdClose } from "react-icons/io";

class DevelopModal extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state ={
      disableTip: false,
      disableDrag: true
    }
    this.dragRef = React.createRef();
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

  accept = () =>{
    this.props.editor.execute( 'insertDevelop', {text: this.props.text, numLines: this.props.numLines, extraspace: this.props.extraspace, addHowToSolve: this.props.addHowToSolve});
    this.props.editor.editing.view.focus();
    this.props.resetDevelopModal();
    this.props.closeDevelopModal();
  }

  /* Manages calls to the dispatcher to update data */
  handleChange(e) {
    switch(e.target.name){
      case "text":
        this.props.updateDevelopText(e.target.value);
        break;
      case "numLines":
        this.props.updateDevelopNumLines(e.target.value);
        break;
      case "extraspace":
        this.props.updateDevelopExtraSpace(e.target.checked);
        break;
      case "addHowToSolve":
        this.props.updateDevelopAddHowToSolve(e.target.checked);
        break;
      default:
        break;
    }
  }

  /* Manages the focus of the textarea */
  componentDidUpdate(prevProps){
    if(this.props.text !== prevProps.text && this.props.text === ""){
      this.nameTextarea.focus();
    }
  }

  componentDidMount(){
    this.nameTextarea.focus();
  }

  render() {
    return (
      <Draggable nodeRef={this.dragRef} bounds="body" disabled={this.state.disableDrag}>
        <div ref={this.dragRef} className="modal-develop">
          <div className="modal-develop__content">
            <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalDevelopTip">
                <ReactTooltip id="modalDevelopTip" place="top" effect="solid" delayHide={2000} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>¡Puedes arrastrar esta ventana a cualquier parte si mantienes pulsada la parte superior de la misma!</ReactTooltip>
                <button onClick={this.props.closeDevelopModal}><IoMdClose size="1.2em"/></button>
            </div>
            <div className="modal-develop__content__main">
              <div className="modal-develop__content__main__container">
                <div className="container__info">
                  <span>* Campos obligatorios</span>
                </div>
                <div className="container__text">
                  <label><span>*</span>Inserte el enunciado del ejercicio de desarrollo:</label>
                  <textarea ref={(textarea) => {this.nameTextarea = textarea;}} id="text" name="text" value={this.props.text} onChange={this.handleChange} cols = "70"/>
                </div>
                <div className="container">
                  <label><span>*</span>Número de líneas para el ejercicio:<input type="number" id="numLines" name="numLines" min="1" value={this.props.numLines} onChange={this.handleChange}/></label> 
                </div>
                <div className="container__extraspace">
                  <label><input id="extraspace" type="checkbox" name="extraspace" onChange={this.handleChange} checked={this.props.extraspace}/>Añadir espacio extra entre líneas</label> 
                </div>
                <div className="container__addHowToSolve">
                  <label><input id="addHowToSolve" type="checkbox" name="addHowToSolve" onChange={this.handleChange} checked={this.props.addHowToSolve}/>Añadir ejemplo de cómo resolver el ejercicio</label>
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="reset" onClick={this.props.resetDevelopModal}>Resetear</button>
              <button className="accept" onClick={this.accept} disabled={!this.props.text || this.props.numLines <= 0}>Aceptar</button>
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

/* Functions to execute (modify redux) */
const mapDispatchToProps = (dispatch) => ({
  closeDevelopModal: () => dispatch(closeDevelopModal()),
  resetDevelopModal: () => dispatch(resetDevelopModal()),
  updateDevelopNumLines: (numLines) => dispatch(updateDevelopNumLines(numLines)),
  updateDevelopText: (text) => dispatch(updateDevelopText(text)),
  updateDevelopExtraSpace: (extraspace) => dispatch(updateDevelopExtraSpace(extraspace)),
  updateDevelopAddHowToSolve: (add) => dispatch(updateDevelopAddHowToSolve(add))
});

/* Data (read redux) */
const mapStateToProps = createStructuredSelector({
  numLines: selectDevelopNumLines,
  text: selectDevelopText,
  extraspace: selectDevelopExtraSpace,
  addHowToSolve: selectDevelopAddHowToSolve,
  editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopModal);