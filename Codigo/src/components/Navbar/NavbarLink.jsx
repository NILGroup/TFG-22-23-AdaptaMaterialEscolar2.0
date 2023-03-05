import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink({ className, icon, text, ...restProps }) {
	return (
		<Link
			className={`${className} flex items-center gap-2 rounded-full p-2 text-secondary transition-all duration-200 hover:bg-button hover:bg-opacity-20 sm:rounded-md sm:py-2 sm:px-6`}
			{...restProps}
		>
			{icon}
			<p className="hidden text-navbar-link-text sm:block">{text}</p>
		</Link>
	);
}
