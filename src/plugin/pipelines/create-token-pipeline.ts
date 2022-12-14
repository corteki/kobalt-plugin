import { of, filter, combineLatest } from "rxjs";
import type { CreateTokenInput } from "../../core/models/inputs";
import { sendNamespacesRetreived } from "./events";
import { collectPages, pages, pageWithValidPluginData } from "./pages";
import {
  addToken,
  getNamespaces,
  getNamespaceTypesAsJson,
  getThemeAsJson,
} from "./plugin-data";

export const createTokenPipeline = ({ token, namespace }: CreateTokenInput) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const theme$ = node$.pipe(getThemeAsJson);
  const namespaceTypes$ = node$.pipe(getNamespaceTypesAsJson);
  const namespace$ = of(namespace);
  const token$ = of(token);
  combineLatest([node$, theme$, namespaceTypes$, namespace$, token$])
    .pipe(addToken, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
