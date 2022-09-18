import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Plugin } from "./plugin";
import { ThemeProvider } from "styled-components";
import { figmaTheme } from "./figma-theme";
import { sendEvent } from "./utilities/create-message-observable";
import { PluginEvent } from "../core/plugin-event";

const element = document.getElementById("root");
if (element) {
  const root = createRoot(element);
  sendEvent(PluginEvent.Loaded.Plugin);
  root.render(
    <StrictMode>
      <ThemeProvider theme={figmaTheme}>
        <Plugin />
      </ThemeProvider>
    </StrictMode>
  );
}
