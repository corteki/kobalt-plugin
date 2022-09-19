export enum Loaded {
  Plugin = "plugin-loaded",
}

export enum Retreived {
  Pages = "pages-retreived",
  Namespaces = "namespaces-retreived",
  Tokens = "tokens-retreived",
}

export enum Created {
  Page = "page-created",
  Namespace = "namespace-created",
  Token = "token-created",
}

export enum Selected {
  Page = "page-selected",
  None = "none-selected",
}

export class PluginEvent {
  static get Loaded() {
    return Loaded;
  }
  static get Retreived() {
    return Retreived;
  }
  static get Created() {
    return Created;
  }
  static get Selected() {
    return Selected;
  }
}
