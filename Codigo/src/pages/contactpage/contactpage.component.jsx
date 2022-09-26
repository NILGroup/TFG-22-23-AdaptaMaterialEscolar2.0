import React from 'react';
import './contactpage.styles.scss';
import UcmLogo from '../../assets/ucmlogo.png';
import Github from '../../assets/GitHub-Mark-32px.png';
class ContactPage extends React.Component {

    constructor(props){
        super();
    }

    render(){
        return (<div className='contact-info'>
            <h2>AdaptaMaterialEscolar</h2>
            <h3>Herramienta para la adaptación de asignaturas a necesidades educativas especiales</h3>

            <a href="https://github.com/NILGroup/TFG-AdaptaMaterialEscolar"><img alt="Logotipo de GitHub" src={Github}></img>Enlace al repositorio de Github</a>
                <h4>Autores:</h4>
                <div>Pablo Miranda Torres</div>
                <div className="mail">pmiran01@ucm.es</div>   
                <div>Jorge Velasco Conde</div>
                <div className="mail">jvelas01@ucm.es</div>  
                <div>Natalia Rodríguez Peral Valiente</div>
                <div className="mail">natrod01@ucm.es</div>    
                <h4>Tutoras del proyecto:</h4>
                <div>Raquél Hervás Ballesteros</div>   
                <div>Virginia San Francisco Gilmartín</div>    
                <br/>
            <h5>Universidad Complutense de Madrid</h5>
            <img className="logo" alt="Logotipo de la UCM" src={UcmLogo}/>
            
        </div>
        );
    }

}

export default ContactPage;