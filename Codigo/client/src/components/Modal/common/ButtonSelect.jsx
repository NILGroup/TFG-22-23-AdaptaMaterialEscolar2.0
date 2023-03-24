import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function ButtonSelect({ children, id, options, setValue, open, setOpen }) {
	const [option, setOption] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
		setOption(event.target.value);
	};

	return (
		<div className="flex flex-col">
			<IconButton
				className="!w-12 !rounded !border !border-solid !border-black  !text-black"
				onClick={() => setOpen(id)}
			>
				{children}
			</IconButton>
			<FormControl className="p-0">
				<Select
					className="!max-h-0 !w-10 !text-transparent  focus:[&_div]:!bg-transparent"
					id="demo-controlled-open-select"
					open={open === id}
					onClose={() => setOpen(null)}
					onOpen={() => setOpen(id)}
					onChange={handleChange}
					disableUnderline
					value={option}
					variant="standard"
					inputProps={{
						IconComponent: () => null,
					}}
				>
					{options.map(({ title, value }, i) => {
						return (
							<MenuItem key={`value_${i}`} value={value}>
								{title}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
