import { defaultIfEmpty, filter, of, tap } from "rxjs";
import { sendNoneSelected, sendPageSelected } from "./events";
import { collectPages, empty, pages } from "./pages";
import { PLUGIN_DATA_KEY } from "./plugin-data";

const pageWithValidPluginData = (page: PageNode) => {
  try {
    const data = page.getPluginData(PLUGIN_DATA_KEY);
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

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
