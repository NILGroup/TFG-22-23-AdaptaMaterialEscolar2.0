import React, { useState } from 'react'

import { AiOutlineBorderlessTable } from "react-icons/ai";
import { BiRectangle } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiLineDouble } from "react-icons/tfi";
import ButtonSelect from "../common/ButtonSelect";
import IconButton from "@mui/material/IconButton";

const staff = {
	grid:{ 
		id: 0,
		option: [{title:'5 mm', value:'grid_5'}, {title:'6 mm', value:'grid_6'}, {title:'8 mm', value:'grid_8'}],	
	},
	doubleLine:{ 
		id: 1,
		option: [{title:'2,5 mm', value:'doubleLine_2_5'}, {title:'3 mm', value:'doubleLine_3'}, {title:'3,5 mm', value:'doubleLine_3_5'}],	
	},
	line:{ 
		id: 2,
		option: [{title:'2,5 mm', value:'line_2_5'}, {title:'3 mm', value:'line_3'}, {title:'3,5 mm', value:'line_3_5'}],		
	}
}

export default function StaffButtons({setValue}) {
    const [open, setOpen] = useState(null);
  return (
    <div className="flex flex-col p-4">
    <label className="text-base">Tipo de pauta: </label>
    <div className="flex flex-wrap gap-4">
        <ButtonSelect id={staff.grid.id} options={staff.grid.option} open={open} setOpen={setOpen} setValue={setValue}>
            <AiOutlineBorderlessTable size={16}/>
            <IoMdArrowDropdown size={16}/>
        </ButtonSelect>

        <ButtonSelect id={staff.doubleLine.id} options={staff.doubleLine.option} open={open} setOpen={setOpen} setValue={setValue}>
            <TfiLineDouble size={16}/>
            <IoMdArrowDropdown size={16}/>
        </ButtonSelect>

        <ButtonSelect id={staff.line.id} options={staff.line.option} open={open} setOpen={setOpen} setValue={setValue}>
            <HiOutlineMinus size={16}/>
            <IoMdArrowDropdown size={16}/>
        </ButtonSelect>

        <div className="flex flex-col">
            <IconButton
                className="!border !border-solid !rounded !border-black !w-8  !text-black"
                onClick={() => setValue("square")}
            >
                <BiRectangle size={16}/>
            </IconButton>
        </div>

        <div
            className="flex flex-col"
        >
            <IconButton 
                className="!border !border-solid !rounded !border-black !w-8  !text-black"
                onClick={() => setValue("square_space")}
            >
                <BiRectangle size={16} style={{color: "transparent"}}/>
            </IconButton>
        </div>
    </div>
</div>
  )
}
