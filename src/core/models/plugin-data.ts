/**
 * data saved in plugin data
 */

export type TokenPluginData = {
  name: string;
  value: string;
};

export type TokenMapPluginData = {
  [id: string]: TokenPluginData;
};

export type NamespaceMapPluginData = {
  [namespace: string]: TokenMapPluginData;
};

export type NamespaceTypeMapPluginData = {
  [namespace: string]: string | "text" | "color" | "font" | "file";
};
