import { combineLatest, combineLatestAll, map, of, zip } from "rxjs";
import type { CreateNamespacePayload } from "../types";
import { sendNamespacesRetreived } from "./events";
import { findPage } from "./pages";
import {
  addNamespace,
  getNamespaces,
  getPluginDataAsJson,
} from "./plugin-data";

export const createNamespacePipeline = ({
  page,
  namespace,
}: CreateNamespacePayload) => {
  const node$ = of(page).pipe(findPage);
  const data$ = node$.pipe(getPluginDataAsJson);
  const namespace$ = of(namespace);
  combineLatest([node$, data$, namespace$])
    .pipe(addNamespace, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
