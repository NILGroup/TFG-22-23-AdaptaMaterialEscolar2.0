import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink({ className, icon, text, ...restProps }) {
	return (
		<Link
			className={`${className} flex items-center gap-2 rounded-full p-2 text-secondary outline-none transition-all duration-200 hover:bg-button hover:bg-opacity-20 focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-opacity-30 lg:rounded-lg lg:py-2 lg:px-6`}
			{...restProps}
		>
			{icon}
			<p className="hidden text-navbar-link-text lg:block">{text}</p>
		</Link>
	);
}
