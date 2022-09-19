import { of } from "rxjs";
import { getNamespaces, getPluginDataAsJson } from "./plugin-data";
import { sendNamespacesRetreived } from "./events";
import { findPage } from "./pages";

export const retreiveNamespacesPipeline = (name: string) =>
  of(name)
    .pipe(findPage, getPluginDataAsJson, getNamespaces, sendNamespacesRetreived)
    .subscribe();
