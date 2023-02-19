import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";



export default function ButtonSelect({children, id, options, setValue, open, setOpen}) {
    const [option, setOption] = useState(options[0].value);

    const handleChange = (event) => {
        setValue(event.target.value)
		setOption(event.target.value);
	};

    return (
      <div className="flex flex-col">
        <IconButton
            className="!border !border-solid !rounded !border-black !w-12  !text-black"
            onClick={() => setOpen(id)}
        >
            {children}
        </IconButton>
        <FormControl className="p-0">
            <Select
                className="!max-h-0 !text-transparent !w-10 focus-within:!bg-transparent"
                id="demo-controlled-open-select"
                open={open === id}
                onClose={() =>
                    setOpen(null)
                }
                onOpen={() =>
                    setOpen(id)
                }
                onChange={handleChange}
                disableUnderline
                value={option}
                variant="standard"
                inputProps={{
                    IconComponent: () => null,
                }}>
                {options.map(({title, value}, i) => {
                    return (
                        <MenuItem key={`value_${i}`} value={value}>{title}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    </div>
    );
}
