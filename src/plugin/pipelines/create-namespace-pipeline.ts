import { combineLatest, of, filter } from "rxjs";
import { sendNamespacesRetreived } from "./events";
import { collectPages, pages, pageWithValidPluginData } from "./pages";
import {
  addNamespace,
  getNamespaces,
  getPluginDataAsJson,
} from "./plugin-data";

export const createNamespacePipeline = (namespace: string) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const data$ = node$.pipe(getPluginDataAsJson);
  const namespace$ = of(namespace);
  combineLatest([node$, data$, namespace$])
    .pipe(addNamespace, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
