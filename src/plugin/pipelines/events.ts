import { of, tap } from "rxjs";
import { EventMessage, MessageType } from "../../core/message";
import { PluginEvent } from "../../core/plugin-event";

export const sendPageSelected = (page: PageNode) =>
  of(
    figma.ui.postMessage({
      type: MessageType.Event,
      event: PluginEvent.Selected.Page,
      payload: page.name,
    } as EventMessage<string>)
  );

export const sendNoneSelected = () =>
  of(
    figma.ui.postMessage({
      type: MessageType.Event,
      event: PluginEvent.Selected.None,
    } as EventMessage)
  );

export const sendPagesRetreived = tap((pages: string[]) =>
  figma.ui.postMessage({
    type: MessageType.Event,
    event: PluginEvent.Retreived.Pages,
    payload: pages,
  } as EventMessage<string[]>)
);

export const sendNamespacesRetreived = tap((namespaces: string[]) =>
  figma.ui.postMessage({
    type: MessageType.Event,
    event: PluginEvent.Retreived.Namespaces,
    payload: namespaces,
  } as EventMessage<string[]>)
);
