import React from "react";

import { Link } from "react-router-dom";

// React Icons
import { AiTwotoneSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";

import NavbarLink from "./NavbarLink";

export default function Navbar() {
	return (
		<div className="flex w-full justify-between bg-white p-6 shadow-md">
			<div className="max-w-[12.5rem] flex-shrink-0 hover:animate-pulse">
				<Link to="/">
					<img src={`${process.env.PUBLIC_URL}/img/Logo.png`} alt="Logo de AME2" />
				</Link>
			</div>
			<div className="flex gap-2">
				<NavbarLink to="ayuda">
					<BiHelpCircle />
					<p>Ayuda</p>
				</NavbarLink>
				<NavbarLink to="configuracion">
					<AiTwotoneSetting />
					<p>Configuración</p>
				</NavbarLink>
			</div>
		</div>
	);
}
