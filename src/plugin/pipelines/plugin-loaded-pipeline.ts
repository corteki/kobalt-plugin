import { defaultIfEmpty, filter, of, tap } from "rxjs";
import { sendNoneSelected, sendPageSelected } from "./events";
import { collectPages, empty, pages, pageWithValidPluginData } from "./pages";

export const pluginLoadedPipeline = () =>
  of(pages)
    .pipe(
      collectPages,
      filter(pageWithValidPluginData),
      tap(sendPageSelected),
      defaultIfEmpty(null),
      filter(empty),
      tap(sendNoneSelected)
    )
    .subscribe();
