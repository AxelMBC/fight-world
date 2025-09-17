import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import WorldMap from "./pages/WorldMap";
import Mexico from "./pages/countries/Mexico/index.tsx";
import Thailand from "./pages/countries/Thailand/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      { index: true, element: <WorldMap /> },
      { path: "Mexico", element: <Mexico /> },
      { path: "Thailand", element: <Thailand /> },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Check your index.html file."
  );
}

const root = createRoot(rootElement);
root.render(<RouterProvider router={router} />);
