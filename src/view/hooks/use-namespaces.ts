import { Subject, map, BehaviorSubject } from "rxjs";
import { EventMessage } from "../../core/message";
import { PluginEvent } from "../../core/plugin-event";
import { NamespaceOutput } from "../../core/models/outputs";
import { createMessageObservable } from "../utilities/create-message-observable";
import { createPluginSubscription } from "../utilities/create-plugin-subscription";

const data$ = new Subject<NamespaceOutput[] | undefined>();
const error$ = new Subject<string | undefined>();
const loading$ = new BehaviorSubject(false);

const handleEvents = map((message: EventMessage<NamespaceOutput[]>) => {
  loading$.next(true);
  switch (message.event) {
    case PluginEvent.Retreived.Namespaces: {
      if (message.payload) {
        data$.next(message.payload);
      }
      loading$.next(false);
      break;
    }
    default: {
      error$.next(`[useNamespaces]: "${message.event}" unhandled.`);
      loading$.next(false);
      break;
    }
  }
});

export const useNamespaces = () =>
  createPluginSubscription(
    createMessageObservable<NamespaceOutput[]>(handleEvents, [
      PluginEvent.Retreived.Namespaces,
    ]),
    data$,
    loading$,
    error$
  );
