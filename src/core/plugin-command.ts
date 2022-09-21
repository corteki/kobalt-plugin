enum Retreive {
  Pages = "retreive-pages",
  Namespaces = "retreive-namespaces",
}

enum Select {
  Page = "select-page",
}

enum Create {
  Page = "create-page",
  Namespace = "create-namespace",
  Token = "create-token",
}

enum Update {
  Token = "update-token",
}

enum Delete {
  Token = "delete-token",
}

export class PluginCommand {
  static get Retreive() {
    return Retreive;
  }
  static get Select() {
    return Select;
  }
  static get Create() {
    return Create;
  }
  static get Update() {
    return Update;
  }
  static get Delete() {
    return Delete;
  }
}
