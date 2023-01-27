import { useState } from "react";
import Subtoolbar from "./SubToolbar/SubToolbar";
import style from "./Toolbar.module.css"


export default function Toolbar({editor}){
    //A pensar
    const [toolbarGroups,setToolbarGroups] = useState(<Subtoolbar editor={editor}/>);
    
    return (
        
        <>
        <div className={style.toolbar}>
            <div className={style.toolbar_options}>
                <button className={style.options_buttons} onClick ={() => {setToolbarGroups(<></>)}}>
                    Archivo
                </button>
                <button className={style.options_buttons}  onClick ={() => {setToolbarGroups(<Subtoolbar editor={editor}/>)}}>
                    Formato
                </button>
                <button className={style.options_buttons}  onClick ={() => {setToolbarGroups(<></>)}}>
                    Ejercicios
                </button>
                <button className={style.options_buttons}  onClick ={() =>{setToolbarGroups( <></>)}}> 
                    Texto
                </button>
            </div>
            {toolbarGroups}
        </div>
         
        </>
    )
}