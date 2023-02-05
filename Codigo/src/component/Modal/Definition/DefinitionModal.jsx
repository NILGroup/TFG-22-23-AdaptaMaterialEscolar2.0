import modalStyle from "../Modal.module.css";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { BiPencil, BiRectangle } from "react-icons/bi";
import {AiOutlineBorderlessTable} from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TfiLineDouble } from "react-icons/tfi"
import ModalHeader from "../ModalHeader";
import style from "./DefinitionModal.module.css";
import guideLine from "./GuideLine.module.css";
import { useState } from "react";
import { Transforms } from 'slate';


const introduction = (n) => `Define los ${n} siguientes conceptos:`
const MAX_LENGTH = 23
//Para la botonera
const typeStaff ={
    grid:0,
    doubleLine:1,
    line: 2    
}

export default function DefinitionModal({editor, isOpen, onClose}) {
    const [concepts, setConcepts] = useState([]);
    const [isModify, setModify] = useState([]);
    const [number, setNumber] = useState(1);
    const [option, setOption] = useState("doubleLine_2_5");
    //Boton de pauta:
    const [open, setOpen] = useState(Array(3).fill(false));

    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleClose = (i) => {
        setOpen(open.map((e, j) => false ));
    };

    const handleOpen = (i) => {
        setOpen(open.map((e, j) => i===j ));
    };    
    if (!isOpen)
        return null;
    //Funciones para modificar los conceptos.
    const removeConcept = (index) => {
        setConcepts(concepts.filter((e, i) => i !== index))
        setModify(isModify.filter((e, i) => i !== index))
    }
    const updateConcept = (index) => {
        setModify(isModify.map( (e, i) => i === index ? !e : false ))      
    }
    
    const renderLines = () => {

        let lines = [];
        let space= (num) => /^doubleLine/.test(option) ?  <div className={guideLine.space} key={`space_${num}`}></div>  : <></>

        for(let i = 0; i < number; i++){
            lines.push(
            <>
             <div className={guideLine[option]} key={`pauta_${i}`}></div> 
             {space(i)}
            </>
             )

        }

        return lines;
    }
    //Insertar datos en el editor
    const insertDatos = () => {
        onClose()
        const ejercicio = { type: 'definition', children: [] }
        const numConcepts = concepts.length
        const enunciado = { type: 'paragraph', children: [{ text: introduction(numConcepts) }]}
        ejercicio.children.push(enunciado);       

        for(let i = 0; i < numConcepts; i++){
            ejercicio.children.push({ type: 'paragraph', children: [{ text: `${concepts[i]}:` }]})
            for(let j = 0; j < number; j++){
                ejercicio.children.push({ type: 'staff', style:option , children: [{ text: '' }] })
                ejercicio.children.push({ type: 'staff', style:"space" , children: [{ text: '' }] })
            }
            ejercicio.children.push({ type: 'staff', style:"space" , children: [{ text: '' }] })
        }
        setConcepts([])
        setNumber(1)
        setOption('')
        Transforms.insertNodes(editor, ejercicio);
    }

    return (
        <div className={modalStyle.modalOverlay}>
            <div className={modalStyle.modalContainer} >
                <ModalHeader title="Ejercicio de definiciones" onClose={onClose} />
                <div className={modalStyle.modalBody}>
                   <div className={style.options}>
                    <div>
                        <form onSubmit={(e) => { 
                            e.preventDefault()
                            if( e.target.concept.value === "")
                                return

                            const concept = e.target.concept.value
                            setConcepts([...concepts, concept])
                            e.target.concept.value = ""
                        }}>
                            <div className={style.form}>
                                    <label className={style.label} htmlFor="concept">Conceptos:</label>
                                    <div className={style.align}>
                                        <input name="concept" id="concept" type="text" className={style.input} required maxLength={MAX_LENGTH}/>
                                        <button type="submit" className={style.plusButton} onClick={() => { setModify([...isModify, false ]) }}><IoAddCircle/></button>
                                    </div>
                            </div>
                        </form>

                    </div>
                    <div>
                        <div className={style.form}>
                            <label className={style.label}>Tipo de pauta: </label>
                            <div className={style.buttons}>

                                <div className={style.staff}>
                                    <IconButton className={style.staffButton} onClick={() => handleOpen(typeStaff.grid)}>
                                        <AiOutlineBorderlessTable style={{ width:'1rem', height: '1rem'}}/>
                                        <IoMdArrowDropdown style={{ width:'0.8rem', height: '0.8rem'}}/>
                                    </IconButton>
                                    <FormControl>
                                        <Select
                                        className={style.select}
                                        id="demo-controlled-open-select"
                                        open={open[typeStaff.grid]}
                                        onClose={() => handleClose(typeStaff.grid)}
                                        onOpen={() => handleOpen(typeStaff.grid)}
                                        value={option}
                                        onChange={handleChange}
                                        disableUnderline
                                        variant="standard" 
                                        inputProps={{ IconComponent: () => null }}
                                        >
                                            <MenuItem value="grid_5">5 mm</MenuItem>
                                            <MenuItem value="grid_6">6 mm</MenuItem>
                                            <MenuItem value="grid_8">8 mm</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>


                                <div className={style.staff}>
                                    <IconButton className={style.staffButton} onClick={() => handleOpen(typeStaff.doubleLine)}>
                                        <TfiLineDouble style={{ width:'1rem', height: '1rem'}}/>
                                        <IoMdArrowDropdown style={{ width:'0.8rem', height: '0.8rem'}}/>
                                    </IconButton>
                                    <FormControl>
                                        <Select
                                        className={style.select}
                                        id="demo-controlled-open-select"
                                        open={open[typeStaff.doubleLine]}
                                        onClose={() => handleClose(typeStaff.doubleLine)}
                                        onOpen={() => handleOpen(typeStaff.doubleLine)}
                                        value={option}
                                        onChange={handleChange}
                                        disableUnderline
                                        variant="standard" 
                                        inputProps={{ IconComponent: () => null }}
                                        >
                                            <MenuItem value="doubleLine_2_5">2,5 mm</MenuItem>
                                            <MenuItem value="doubleLine_3">3 mm</MenuItem>
                                            <MenuItem value="doubleLine_3_5">3,5 mm</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={style.staff}>
                                    <IconButton className={style.staffButton} onClick={() => handleOpen(typeStaff.line)}>
                                        <HiOutlineMinus style={{ width:'1rem', height: '1rem'}}/>
                                        <IoMdArrowDropdown style={{ width:'0.8rem', height: '0.8rem'}}/>
                                    </IconButton>
                                    <FormControl>
                                        <Select
                                        className={style.select}
                                        id="demo-controlled-open-select"
                                        open={open[typeStaff.line]}
                                        onClose={() => handleClose(typeStaff.line)}
                                        onOpen={() => handleOpen(typeStaff.line)}
                                        value={option}
                                        onChange={handleChange}
                                        disableUnderline
                                        variant="standard" 
                                        inputProps={{ IconComponent: () => null }}
                                        >
                                            <MenuItem value="line_2_5">2,5 mm</MenuItem>
                                            <MenuItem value="line_3">3 mm</MenuItem>
                                            <MenuItem value="line_3_5">3,5 mm</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={style.staff}>
                                    <IconButton className={style.staffButton_small} onClick={() => setOption("square")}>
                                        <BiRectangle style={{ width:'1rem', height: '1rem'}}/>
                                    </IconButton>
                                </div>

                                <div className={style.staff} onClick={() => setOption("square_space")}>
                                    <IconButton className={style.staffButton_small}>
                                        <BiRectangle style={{ width:'1rem', height: '1rem', color:'transparent'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.grid_start}>
                        <ul className={style.ul}>
                        {concepts.map((concept, index) => {
                            return (
                                <li className={style.li} key={`concept-${index}`}>
                                    
                                    { isModify[index] ?  
                                    <input type="text" required maxLength={MAX_LENGTH} className={style.input} value={concept} onChange={(e) => setConcepts(concepts.map((c, i) => i === index  ? e.target.value : c ))}/> 
                                    : <p className={style.concept}>{concept} </p>
                                    }
                                    <div className={style.botonera}>
                                        <button className={`${style.buttonUpdate} ${isModify[index] && style.button_lg}`} onClick={() => updateConcept(index)}><BiPencil style={{ width:'21px', height: '21px'}}/></button>
                                        <button  className={style.button} onClick={() => removeConcept(index)}><FiTrash2 style={{ width:'21px', height: '21px'}}/></button>
                                    </div>
                                </li>
                            )
                        })}
                        </ul>

                    </div>
                    
                    <div className={style.end} >
                        <label className={style.labelnum}>Número de filas:</label>
                        <input className={style.inputNum} type="number" value={number} min="1" onChange={(e) => setNumber(e.target.value)}/>
                    </div>
                   </div>
        
                   <hr/>
                   <div className={style.preview}>
                        <div className={style.preview_header}>
                            <p>Vista previa</p>
                        </div>
                        <div className={style.preview_body}>
                            {concepts.length > 0 && <p>{introduction(concepts.length)}</p>}
                            {concepts.map( concept => {
                                return (
                                    <>

                                        <p className={style.previewConcept}> {concept}:</p>
                                        {  
                                            renderLines()
                                        }
                                        
                                    </>
                                )
                            })}
                        </div>
                   </div>

                    <button className={style.ok} onClick={insertDatos}>
                        ok
                    </button>
                </div>
            </div>
        </div>
    );
}
