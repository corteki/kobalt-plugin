enum Retreive {
  Pages = "retreive-pages",
}

enum Select {
  Page = "select-page",
}

enum Create {
  Page = "create-page",
  Namespace = "create-namespace",
  Token = "create-token",
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
}