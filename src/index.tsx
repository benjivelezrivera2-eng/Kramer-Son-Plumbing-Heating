import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { ElementHomeDesktop } from "./screens/ElementHomeDesktop/ElementHomeDesktop";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ElementHomeDesktop />
    <Analytics />
  </StrictMode>,
);
