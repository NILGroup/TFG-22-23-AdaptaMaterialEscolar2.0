import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// Routes
// import Configuration from "./routes/Configuration";
import ErrorPage from "./routes/ErrorPage";
// import Help from "./routes/Help";
import Home from "./routes/Home";
import Root from "./routes/Root";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					errorElement: <ErrorPage />,
					children: [
						{
							path: "",
							element: <Home />,
						},
						// {
						// 	path: "configuracion",
						// 	element: <Configuration />,
						// },
						// {
						// 	path: "ayuda",
						// 	element: <Help />,
						// },
					],
				},
			],
		},
	],  
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
