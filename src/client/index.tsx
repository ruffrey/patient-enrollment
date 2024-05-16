import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root } from "./routes/root";
import {PatientsPage} from "./routes/patients";
import "./index.scss";
import {RiskPage} from "./routes/risk";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/patients",
    element: <PatientsPage />,
  },{
    path: "/risk",
    element: <RiskPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);