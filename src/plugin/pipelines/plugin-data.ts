import { tap } from "rxjs";
export const PLUGIN_DATA_KEY = "theme";

export const initializePluginData = tap((page: PageNode) => {
  page.setPluginData(PLUGIN_DATA_KEY, "{}");
});
