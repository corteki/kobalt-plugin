import { combineLatest, of, filter } from "rxjs";
import { CreateNamespaceInput } from "../../core/models/inputs";
import { sendNamespacesRetreived } from "./events";
import { collectPages, pages, pageWithValidPluginData } from "./pages";
import {
  addNamespace,
  getNamespaces,
  getNamespaceTypesAsJson,
  getThemeAsJson,
} from "./plugin-data";

export const createNamespacePipeline = (namespace: CreateNamespaceInput) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const theme$ = node$.pipe(getThemeAsJson);
  const namespaceTypes$ = node$.pipe(getNamespaceTypesAsJson);
  const namespace$ = of(namespace);
  combineLatest([node$, theme$, namespaceTypes$, namespace$])
    .pipe(addNamespace, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
