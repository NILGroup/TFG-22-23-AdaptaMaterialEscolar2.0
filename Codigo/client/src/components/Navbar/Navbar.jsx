import React from "react";

import { Link } from "react-router-dom";

// React Icons
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineCog } from "react-icons/hi";

import NavbarLink from "./NavbarLink";

export default function Navbar() {
	return (
		<div className="flex w-full bg-white py-4 px-2 shadow-sm shadow-grey-dark sm:p-4">
			<div className="max-w-[12rem] flex-shrink-0 mx-auto">
				<Link to="/" className="w-full outline-none hover:animate-pulse focus-visible:animate-pulse">
					<img src={`${process.env.PUBLIC_URL}/img/Logo.png`} alt="Logo de AME2" />
				</Link>
			</div>
			{/* <div className="flex items-center gap-2">
				<NavbarLink to="ayuda" icon={<BiHelpCircle className="text-navbar-link-icon" />} text="Ayuda" />
				<NavbarLink
					to="configuracion"
					icon={<HiOutlineCog className="text-navbar-link-icon" />}
					text="Configuración"
				/>
			</div> */}
		</div>
	);
}
