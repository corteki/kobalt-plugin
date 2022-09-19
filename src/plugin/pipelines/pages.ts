import { mergeMap, map } from "rxjs";

export const pages = figma.root.findAllWithCriteria({ types: ["PAGE"] });
export const collectPages = mergeMap((pages: PageNode[]) => pages);
export const findPage = map(
  (name: string) =>
    figma.root.findOne(
      (node) => node.type === "PAGE" && node.name === name
    ) as PageNode
);
export const empty = (page: PageNode | null) => page === null;
