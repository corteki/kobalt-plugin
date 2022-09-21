/**
 * Output to from view layer
 */

export type Input = {
  namespace: string;
};

export type TokenInput = {
  name: string;
  value: string;
};

export type TokenEntityInput = TokenInput & {
  id: string;
};

export type CreateTokenInput = Input & {
  token: TokenInput;
};

export type UpdateTokenInput = Input & {
  token: TokenEntityInput;
};

export type DeleteTokenInput = Input & {
  id: string;
};

export type CreateNamespaceInput = Input & {
  type: string;
};

export type SelectPageInput = string;
