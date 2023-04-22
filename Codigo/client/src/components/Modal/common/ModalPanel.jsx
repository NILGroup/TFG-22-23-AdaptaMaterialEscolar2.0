import React from "react";

export default function ModalPanel({ label, attributes, panelClassName, children }) {
	return (
		<div className="w-full max-w-full">
			<div className="flex items-center justify-between rounded-md rounded-b-none border-2 border-b-0 border-grey-dark bg-grey px-4 py-2">
				<h4 className="text-modal-heading">{label}</h4>
				<div>{attributes}</div>
			</div>
			<div className={`${panelClassName} input-textarea custom-scrollbar w-full rounded-t-none`}>{children}</div>
		</div>
	);
}
