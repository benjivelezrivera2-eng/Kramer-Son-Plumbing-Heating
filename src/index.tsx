import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { App } from "./app/App";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
