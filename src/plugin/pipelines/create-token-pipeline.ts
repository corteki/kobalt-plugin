import { of, filter, combineLatest } from "rxjs";
import type { CreateTokenPayload } from "../../core/types";
import { sendNamespacesRetreived } from "./events";
import { collectPages, pages, pageWithValidPluginData } from "./pages";
import { addToken, getNamespaces, getPluginDataAsJson } from "./plugin-data";

export const createTokenPipeline = ({
  token,
  namespace,
}: CreateTokenPayload) => {
  const node$ = of(pages).pipe(collectPages, filter(pageWithValidPluginData));
  const data$ = node$.pipe(getPluginDataAsJson);
  const namespace$ = of(namespace);
  const token$ = of(token);
  combineLatest([node$, data$, namespace$, token$])
    .pipe(addToken, getNamespaces, sendNamespacesRetreived)
    .subscribe();
};
