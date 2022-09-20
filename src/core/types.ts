export type Token = {
  name: string;
  value: string;
};

export type CreateTokenPayload = {
  token: Token;
  namespace: string;
};

export type DesignToken = {
  [key: string]: string;
};

export type Namespace = { namespace: string; tokens: Token[] };
export type NamespaceMap = {
  [key: string]: DesignToken;
};
