import type {
  CreateNamespaceInput,
  TokenEntityInput,
  TokenInput,
} from "./inputs";
import {
  NamespaceMapPluginData,
  NamespaceTypeMapPluginData,
} from "./plugin-data";

export type NamespaceStream = {
  namespaceMapPluginData: NamespaceMapPluginData;
  namespaceTypeMapPluginData: NamespaceTypeMapPluginData;
};

export type AddNamespaceStream<PageNode> = [
  page: PageNode,
  theme: NamespaceMapPluginData,
  namespaceTypes: NamespaceTypeMapPluginData,
  namespace: CreateNamespaceInput
];

export type TokenStream<PageNode> = [
  PageNode,
  NamespaceMapPluginData,
  NamespaceTypeMapPluginData,
  string
];

export type AddTokenStream<PageNode> = [...TokenStream<PageNode>, TokenInput];

export type UpdateTokenStream<PageNode> = [
  ...TokenStream<PageNode>,
  TokenEntityInput
];

export type DeleteTokenStream<PageNode> = [...TokenStream<PageNode>, string];
