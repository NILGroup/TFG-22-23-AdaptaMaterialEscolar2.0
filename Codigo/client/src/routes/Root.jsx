import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
	return (
		<>
			<div className="header print:hidden">
				<Navbar />
			</div>
			<div className="content">
				<Outlet />
			</div>
		</>
	);
}
