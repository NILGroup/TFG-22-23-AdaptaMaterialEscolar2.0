import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import "./index.css";

// Routes
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';
import Configuration from './routes/Configuration';
import Help from './routes/Help';

const router = createBrowserRouter([
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
            element: <Home />
          },
          {
            path: "configuracion",
            element: <Configuration />
          },
          {
            path: "ayuda",
            element: <Help />
          }
        ]
      }
    ]
  }
], { basename: "/TFG-22-23-AdaptaMaterialEscolar2.0/" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
