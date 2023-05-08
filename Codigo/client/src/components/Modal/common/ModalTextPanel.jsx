import React from "react";

export default function ModalTextPanel({ label, attributes, textAreaClassName, ...restProps }) {
	return (
		<div className="w-full max-w-full">
			<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
				<h4 className="text-modal-heading">{label}</h4>
				<div>{attributes}</div>
			</div>
			<textarea
				className={`${textAreaClassName} input-textarea custom-scrollbar m-0 w-full rounded-t-none`}
				{...restProps}
			/>
		</div>
	);
}
