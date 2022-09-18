import { mergeMap } from "rxjs";

export const pages = figma.root.findAllWithCriteria({ types: ["PAGE"] });
export const collectPages = mergeMap((pages: PageNode[]) => pages);
