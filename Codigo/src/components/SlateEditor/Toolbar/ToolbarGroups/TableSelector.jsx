import React, {useEffect, useState} from 'react';
import { BiTable } from "react-icons/bi";
import { TableUtil } from '../../utils/TableUtil';


import './TableSelector.css'

export function TableSelector ({editor}){
    const [showOptions, setShowOptions] = useState();
    const [tableData,setTableData] = useState({
        row:0,
        column:0,
    });
    const [tableInput,setTableInput] =useState(Array.from({length:6},()=> Array.from ({length:6},(v,i)=>({
        select:false
    }))))

    useEffect(()=>{
        const newTable = Array.from({length:6},(obj,row)=> Array.from({length:6},(v,col)=>({
            select: (row+1 <= tableData.row && col+1 <= tableData.column),
            column:col,
        })))
        setTableInput(newTable)
    },[tableData])

    useEffect(()=>{
        if(!showOptions){
            setTableData({
                row:0,
                column:0,
            });
        }
    },[showOptions])   

    const handleButtonClick = ()=>{
        setShowOptions(prev => !prev)
    }
    const table = new TableUtil(editor);

    const handleInsert = () =>{
        table.insertTable([], tableData.row, tableData.column)
        setTableData({row:-1,column:-1})
        setShowOptions(false)
    }
    return (
            <div className=' inline-block max-h-10 max-w-10'  >
            <button title='table' onClick={handleButtonClick} className="flex items-center py-1 px-2 gap-1 border-0 bg-transparent hover:rounded-sm hover:bg-grey-dark hover:bg-opacity-50 hover:font-bold">
                <BiTable />
            </button>
            {
                showOptions &&
                <div  className='popup z-20' >
                    <div className='flex flex-col justify-center items-center p-2'>
                        {
                            
                            <span className='text-xs'>{`Insert a ${tableData.row>=1 &&`${tableData.row} x ${tableData.column}`} table`}</span>
                        }
                        <div className='grid grid-cols-6 grid-flow-row auto-rows-auto gap-1' onClick={handleInsert}>
                            {
                                tableInput.map((tableCol,row)=>
                                tableCol.map(({select},col)=>
                                        <div 
                                        key={row+col} 
                                        onMouseOver={()=>setTableData({row: row + 1, column: col + 1})} 
                                        className={`p-2 border ${select ? "border-orange-300" : "border-gray-400"} ${row} ${col}`}
                                        >
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    
                </div>
            }
        </div>
    )
}
