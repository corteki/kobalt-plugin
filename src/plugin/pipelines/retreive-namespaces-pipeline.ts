import { combineLatest, filter, of } from "rxjs";
import {
  collectNamespaceStream,
  getNamespaces,
  getNamespaceTypesAsJson,
  getThemeAsJson,
} from "./plugin-data";
import { sendNamespacesRetreived } from "./events";
import { collectPages, pages, pageWithValidPluginData } from "./pages";

export const retreiveNamespacesPipeline = () => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const theme$ = node$.pipe(getThemeAsJson);
  const namespaceTypes$ = node$.pipe(getNamespaceTypesAsJson);
  combineLatest([theme$, namespaceTypes$])
    .pipe(collectNamespaceStream, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
