import { map, reduce, of } from "rxjs";
import { sendPagesRetreived } from "./events";
import { collectPages, pages } from "./pages";

const extractPageName = map((page: PageNode) => page.name);
const collectPageNames = reduce<string, string[]>(
  (accumulator, current) => [...accumulator, current],
  []
);

export const retreivePagesPipeline = () =>
  of(pages)
    .pipe(collectPages, extractPageName, collectPageNames, sendPagesRetreived)
    .subscribe();
