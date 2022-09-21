/**
 * Output to the view layer
 */

export type TokenOutput = {
  name: string;
  value: string;
};

export type TokenIdentityOutput = {
  id: string;
} & TokenOutput;

export type NamespaceOutput = {
  namespace: string;
  type: string;
  tokens: TokenIdentityOutput[];
};

export type PageOutput = string;
export type PagesOutput = string[];
