import { of, tap } from "rxjs";
import { EventMessage, MessageType } from "../../core/message";
import { PluginEvent } from "../../core/plugin-event";
import {
  NamespaceOutput,
  PageOutput,
  PagesOutput,
} from "../../core/models/outputs";

export const sendPageSelected = (page: PageNode) =>
  of(
    figma.ui.postMessage({
      type: MessageType.Event,
      event: PluginEvent.Selected.Page,
      payload: page.name,
    } as EventMessage<PageOutput>)
  );

export const sendNoneSelected = () =>
  of(
    figma.ui.postMessage({
      type: MessageType.Event,
      event: PluginEvent.Selected.None,
    } as EventMessage)
  );

export const sendPagesRetreived = tap((pages: PagesOutput) =>
  figma.ui.postMessage({
    type: MessageType.Event,
    event: PluginEvent.Retreived.Pages,
    payload: pages,
  } as EventMessage<PagesOutput>)
);

export const sendNamespacesRetreived = tap((namespaces: NamespaceOutput[]) =>
  figma.ui.postMessage({
    type: MessageType.Event,
    event: PluginEvent.Retreived.Namespaces,
    payload: namespaces,
  } as EventMessage<NamespaceOutput[]>)
);
