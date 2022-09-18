import { defaultIfEmpty, filter, of, tap } from "rxjs";
import { sendNoneSelected, sendPageSelected } from "./events";
import { collectPages, pages } from "./pages";
import { PLUGIN_DATA_KEY } from "./plugin-data";

const pageWithValidPluginData = (page: PageNode) => {
  try {
    JSON.parse(page.getPluginData(PLUGIN_DATA_KEY));
    return true;
  } catch (error) {
    return false;
  }
};

const empty = (page: PageNode | null) => page === null;

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
