import { map, of } from "rxjs";
import { sendPageSelected } from "./events";
import { initializePluginData } from "./plugin-data";

const findPage = map(
  (name: string) =>
    figma.root.findOne(
      (node) => node.type === "PAGE" && node.name === name
    ) as PageNode
);

export const selectPagePipeline = (name: string) =>
  of(name)
    .pipe(findPage, initializePluginData, map(sendPageSelected))
    .subscribe();
