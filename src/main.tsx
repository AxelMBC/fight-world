import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import WorldMap from "./pages/WorldMap";
import Mexico from "./pages/countries/Mexico/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <WorldMap /> },
      { path: "Mexico", element: <Mexico /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
