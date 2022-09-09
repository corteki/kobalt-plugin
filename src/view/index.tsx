import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Plugin } from "./plugin";

const element = document.getElementById("root");
if (element) {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <Plugin />
    </StrictMode>
  );
}
