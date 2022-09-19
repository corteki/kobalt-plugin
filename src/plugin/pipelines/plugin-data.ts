import { map, of, tap } from "rxjs";
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

type Stream = [page: PageNode, data: PluginData, namespace: string];

export const addNamespace = map((stream: Stream): PluginData => {
  const [page, data, namespace] = stream;
  const pluginData = { ...data, [namespace]: {} };
  page.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(pluginData));
  return pluginData;
});

export const getNamespaces = map((data: PluginData) => Object.keys(data));
