import React from "react";

import { AiOutlineWarning } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";

import ModalAlertButton from "./ModalAlertButton";

export default function ModalPreview({ warnings, errors, previewHeight, children, attributes }) {
	return (
		<div className="relative w-full max-w-full">
			<div className="flex gap-4 rounded-md rounded-b-none border-2 border-grey-dark bg-grey px-4 py-2">
				<h4 className="text-modal-heading">Vista previa</h4>
				{(warnings !== undefined || errors !== undefined) && (
					<div className="flex items-center gap-2">
						{errors !== undefined && (
							<ModalAlertButton
								icon={<MdErrorOutline size={30} />}
								iconButtonClassName="text-alert-danger-dark hover:text-alert-danger"
								alertBoxClassName="bg-alert-danger text-alert-danger-dark"
								contentList={errors}
							/>
						)}
						{warnings !== undefined && (
							<ModalAlertButton
								icon={<AiOutlineWarning size={30} />}
								iconButtonClassName="text-alert-warning-dark hover:text-alert-warning"
								alertBoxClassName="bg-alert-warning text-alert-warning-dark"
								contentList={warnings}
							/>
						)}
					</div>
				)}
				{attributes && <div className="my-auto ml-auto">{attributes}</div>}
			</div>
			<div
				className={`${
					previewHeight ?? "h-40 max-h-40"
				} overflow-auto rounded-md rounded-t-none border-2 border-t-0 border-grey-dark bg-grey-light px-4 py-2`}
			>
				{children}
			</div>
		</div>
	);
}
