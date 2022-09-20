import { map, tap } from "rxjs";
import type { Namespace, NamespaceMap, Token } from "../../core/types";
export const PLUGIN_DATA_KEY = "theme";

export const initializePluginData = tap((page: PageNode) => {
  page.setPluginData(PLUGIN_DATA_KEY, "{}");
});

export const getPluginDataAsJson = map(
  (page: PageNode): NamespaceMap =>
    JSON.parse(page.getPluginData(PLUGIN_DATA_KEY))
);

type AddNamespaceStream = [
  page: PageNode,
  data: NamespaceMap,
  namespace: string
];
type AddTokenStream = [
  page: PageNode,
  data: NamespaceMap,
  namespace: string,
  token: Token
];

export const addNamespace = map((stream: AddNamespaceStream): NamespaceMap => {
  const [page, data, namespace] = stream;
  const pluginData = Object.assign({}, data, { [namespace]: {} });
  page.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(pluginData));
  return pluginData;
});

export const addToken = map((stream: AddTokenStream): NamespaceMap => {
  const [page, data, namespace, token] = stream;
  const tokens = Object.assign({}, data[namespace], {
    [token.name]: token.value,
  });
  const pluginData = Object.assign({}, data, { [namespace]: tokens });
  page.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(pluginData));
  return pluginData;
});

export const getNamespaces = map((data: NamespaceMap): Namespace[] => {
  return Object.entries(data).reduce<Namespace[]>((acc, [namespace, value]) => {
    acc.push({
      namespace,
      tokens: Object.entries(value).reduce<Token[]>((acc, [name, value]) => {
        acc.push({ name, value });
        return acc;
      }, []),
    });
    return acc;
  }, []);
});
