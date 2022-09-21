import { of, filter, combineLatest } from "rxjs";
import { UpdateTokenInput } from "../../core/models/inputs";
import { sendNamespacesRetreived } from "./events";
import { pages, collectPages, pageWithValidPluginData } from "./pages";
import {
  getNamespaces,
  getNamespaceTypesAsJson,
  getThemeAsJson,
  updateToken,
} from "./plugin-data";

export const updateTokenPipeline = ({ namespace, token }: UpdateTokenInput) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const theme$ = node$.pipe(getThemeAsJson);
  const namespaceTypes$ = node$.pipe(getNamespaceTypesAsJson);
  const namespace$ = of(namespace);
  const token$ = of(token);
  combineLatest([node$, theme$, namespaceTypes$, namespace$, token$])
    .pipe(updateToken, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
