import React from "react";

export default function ModalOkButton({ className, ...restProps }) {
	return (
		<button
			type="submit"
			className={`${className} rounded-md bg-sky-500 py-2 px-10 text-[1.4rem] text-white enabled:hover:bg-sky-600 disabled:bg-opacity-60`}
			{...restProps}
		>
			Ok
		</button>
	);
}
