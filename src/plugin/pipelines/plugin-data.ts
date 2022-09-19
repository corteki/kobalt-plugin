import { map, tap } from "rxjs";
export const PLUGIN_DATA_KEY = "theme";

type DesignTokens = {
  [key: string]: string;
};

type PluginData = {
  [key: string]: DesignTokens;
};

export const initializePluginData = tap((page: PageNode) => {
  page.setPluginData(PLUGIN_DATA_KEY, "{}");
});

export const getPluginDataAsJson = map(
  (page: PageNode): PluginData =>
    JSON.parse(page.getPluginData(PLUGIN_DATA_KEY))
);

export const getNamespaces = map((data: PluginData) => Object.keys(data));
