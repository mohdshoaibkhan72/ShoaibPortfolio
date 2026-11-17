import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// In production #root already holds the page's prerendered HTML (for search engines, link
// previews and no-JS visitors). The app renders fresh over it rather than hydrating, because
// theme, intro and clock state legitimately differ between build time and the visitor's browser.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
