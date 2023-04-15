import React, { useEffect, useState } from "react";

import { BiTable } from "react-icons/bi";
import { TableUtil } from "../../utils/TableUtil";
import { Dropdown } from "flowbite-react";

export function TableSelector({ editor }) {

	const [tableData, setTableData] = useState({
		row: 0,
		column: 0,
	});
	const [tableInput, setTableInput] = useState(
		Array.from({ length: 6 }, () =>
			Array.from({ length: 6 }, (v, i) => ({
				select: false,
			}))
		)
	);

	useEffect(() => {
		const newTable = Array.from({ length: 6 }, (obj, row) =>
			Array.from({ length: 6 }, (v, col) => ({
				select: row + 1 <= tableData.row && col + 1 <= tableData.column,
				column: col,
			}))
		);
		setTableInput(newTable);
	}, [tableData]);

	const table = new TableUtil(editor);

	const handleInsert = () => {
		table.insertTable([], tableData.row, tableData.column);
		setTableData({ row: -1, column: -1 });
	};
	return (
		<>
				<Dropdown label={<BiTable />} color="" class="flex items-center gap-1 border-0 bg-transparent py-1 px-2 hover:rounded-sm hover:bg-grey-dark hover:bg-opacity-50 hover:font-bold" arrowIcon={false} size={15}>
				<Dropdown.Item class="hover:bg-transparent">
					<div onMouseOut={() => setTableData({row: 0, column:0})}>
						<div className="flex flex-col items-center justify-center p-2">
							{
								<span className="text-xs">{`Insert a ${
									tableData.row >= 1 && `${tableData.row} x ${tableData.column}`
								} table`}</span>
							}
							<div className="grid grid-flow-row auto-rows-auto grid-cols-6 gap-1" onClick={handleInsert}>
								{tableInput.map((tableCol, row) =>
									tableCol.map(({ select }, col) => (
										<div
											key={row + col}
											onMouseOver={() => setTableData({ row: row + 1, column: col + 1 })}
											className={`border p-2 ${
												select ? "border-orange-300" : "border-gray-400"
											} ${row} ${col}`}
										></div>
									))
								)}
							</div>
						</div>
					</div>
				</Dropdown.Item>
			</Dropdown>
		</>
		
	);
}
