import { map, tap } from "rxjs";
import { nanoid as createId } from "nanoid/non-secure";
import type {
  TokenMapPluginData,
  NamespaceMapPluginData,
  TokenPluginData,
  NamespaceTypeMapPluginData,
} from "../../core/models/plugin-data";
import type {
  TokenIdentityOutput,
  NamespaceOutput,
} from "../../core/models/outputs";
import {
  AddNamespaceStream,
  AddTokenStream,
  DeleteTokenStream,
  NamespaceStream,
  UpdateTokenStream,
} from "../../core/models/streams";

const DEFAULT_PLUGIN_DATA = "{}";
export const THEME = "theme";
export const NAMESPACE_TYPES = "namespace-types";
export const TOKEN_REFS = "token-refs";

export const initializePluginData = tap((page: PageNode) => {
  page.setPluginData(THEME, DEFAULT_PLUGIN_DATA);
  page.setPluginData(NAMESPACE_TYPES, DEFAULT_PLUGIN_DATA);
  page.setPluginData(TOKEN_REFS, DEFAULT_PLUGIN_DATA);
});

const getAsJson = (page: PageNode, dataKey: string) =>
  JSON.parse(page.getPluginData(dataKey));

export const getThemeAsJson = map(
  (page: PageNode): NamespaceMapPluginData => getAsJson(page, THEME)
);

export const getNamespaceTypesAsJson = map(
  (page: PageNode): NamespaceTypeMapPluginData =>
    getAsJson(page, NAMESPACE_TYPES)
);

export const getTokenRefsAsJson = map(
  (page: PageNode): NamespaceTypeMapPluginData => getAsJson(page, TOKEN_REFS)
);

export const addNamespace = map(
  (stream: AddNamespaceStream<PageNode>): NamespaceStream => {
    const [page, theme, namespaceTypes, { namespace, type }] = stream;
    const namespaceTypeMapPluginData: NamespaceTypeMapPluginData =
      Object.assign({}, namespaceTypes, { [namespace]: type });
    const namespaceMapPluginData: NamespaceMapPluginData = Object.assign(
      {},
      theme,
      { [namespace]: {} }
    );
    page.setPluginData(THEME, JSON.stringify(namespaceMapPluginData));
    page.setPluginData(
      NAMESPACE_TYPES,
      JSON.stringify(namespaceTypeMapPluginData)
    );
    return { namespaceMapPluginData, namespaceTypeMapPluginData };
  }
);

export const collectNamespaceStream = map(
  ([namespaceMapPluginData, namespaceTypeMapPluginData]): NamespaceStream => ({
    namespaceMapPluginData,
    namespaceTypeMapPluginData,
  })
);

export const addToken = map(
  (stream: AddTokenStream<PageNode>): NamespaceStream => {
    const [page, theme, namespaceTypes, namespace, token] = stream;
    const tokenPluginData: TokenPluginData = token;

    const tokenMapPluginData: TokenMapPluginData = {
      [createId()]: tokenPluginData,
    };

    const mergedTokenMapPluginData = Object.assign(
      {},
      theme[namespace],
      tokenMapPluginData
    );
    const savedTokenMapPluginData = Object.assign({}, theme, {
      [namespace]: mergedTokenMapPluginData,
    });
    page.setPluginData(THEME, JSON.stringify(savedTokenMapPluginData));
    return {
      namespaceMapPluginData: savedTokenMapPluginData,
      namespaceTypeMapPluginData: namespaceTypes,
    };
  }
);

export const updateToken = map(
  (stream: UpdateTokenStream<PageNode>): NamespaceStream => {
    const [page, theme, namespaceType, namespace, token] = stream;
    const tokenMapPluginData: TokenMapPluginData = Object.assign(
      {},
      theme[namespace],
      {
        [token.id]: {
          name: token.name,
          value: token.value,
        },
      }
    );
    const namespaceMapPluginData: NamespaceMapPluginData = {
      [namespace]: tokenMapPluginData,
    };
    const savedNamespaceMapPluginData = Object.assign(
      {},
      theme,
      namespaceMapPluginData
    );
    page.setPluginData(THEME, JSON.stringify(savedNamespaceMapPluginData));
    return {
      namespaceMapPluginData: savedNamespaceMapPluginData,
      namespaceTypeMapPluginData: namespaceType,
    };
  }
);

export const deleteToken = map(
  (stream: DeleteTokenStream<PageNode>): NamespaceStream => {
    const [page, theme, namespaceTypes, namespace, id] = stream;
    delete theme[namespace][id];
    page.setPluginData(THEME, JSON.stringify(theme));
    return {
      namespaceMapPluginData: theme,
      namespaceTypeMapPluginData: namespaceTypes,
    };
  }
);

export const getNamespaces = map(
  ({
    namespaceMapPluginData,
    namespaceTypeMapPluginData,
  }: NamespaceStream): NamespaceOutput[] => {
    return Object.entries(namespaceMapPluginData).reduce<NamespaceOutput[]>(
      (acc, [namespace, value]) => {
        const type = namespaceTypeMapPluginData[namespace];
        acc.push({
          namespace,
          type,
          tokens: Object.entries(value).reduce<TokenIdentityOutput[]>(
            (acc, [id, { name, value }]) => {
              acc.push({ id, name, value });
              return acc;
            },
            []
          ),
        });
        return acc;
      },
      []
    );
  }
);
