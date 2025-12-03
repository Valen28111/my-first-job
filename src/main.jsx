import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ResizeProvider } from "./contexts/resize.jsx"
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResizeProvider>
      <App />
    </ResizeProvider>
  </StrictMode>,
);
