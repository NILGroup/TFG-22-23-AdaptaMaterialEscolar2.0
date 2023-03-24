import React from "react";

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();

	return (
		<div>
			<h1>ERROR {error.status}</h1>
			<h2>{error.statusText}</h2>
		</div>
	);
}
