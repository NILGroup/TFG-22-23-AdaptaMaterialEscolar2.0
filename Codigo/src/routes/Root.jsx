import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar"

export default function Root() {
	return (
		<>
			<div className="header">
				<Navbar />
			</div>
			<div className="content">
				<Outlet />
			</div>
		</>
	);
}
