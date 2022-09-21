import { of, filter, combineLatest } from "rxjs";
import { DeleteTokenInput } from "../../core/models/inputs";
import { sendNamespacesRetreived } from "./events";
import { pages, collectPages, pageWithValidPluginData } from "./pages";
import {
  deleteToken,
  getNamespaces,
  getNamespaceTypesAsJson,
  getThemeAsJson,
} from "./plugin-data";

export const deleteTokenPipeline = ({ id, namespace }: DeleteTokenInput) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const theme$ = node$.pipe(getThemeAsJson);
  const namespaceTypes$ = node$.pipe(getNamespaceTypesAsJson);
  const namespace$ = of(namespace);
  const id$ = of(id);
  combineLatest([node$, theme$, namespaceTypes$, namespace$, id$])
    .pipe(deleteToken, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
