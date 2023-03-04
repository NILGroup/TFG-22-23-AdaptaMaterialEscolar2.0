import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink({ className, children, ...restProps }) {
	return (
		<Link
			className={`${className} flex items-center gap-2 rounded-md py-0 px-6 text-navbar-link text-secondary transition-all duration-200 hover:bg-button hover:bg-opacity-20`}
			{...restProps}
		>
			{children}
		</Link>
	);
}
