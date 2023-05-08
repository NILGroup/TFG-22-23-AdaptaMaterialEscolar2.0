import { Dropdown } from "flowbite-react";
import React from "react";

export default function ButtonSelect({ children, options, setValue }) {
	return (
		<Dropdown label={children} arrowIcon={false} color="light">
			{options.map(({ title, value }, i) => {
				return (
					<Dropdown.Item key={`value_${i}`} onClick={() => setValue(value)}>
						{title}
					</Dropdown.Item>
				);
			})}
		</Dropdown>
	);
}
