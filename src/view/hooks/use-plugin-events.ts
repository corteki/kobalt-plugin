import { useObservableState, useSubscription } from "observable-hooks";
import {
  Subject,
  map,
  BehaviorSubject,
  distinctUntilChanged,
  throwError,
} from "rxjs";
import { EventMessage } from "../../core/message";
import { PluginCommand } from "../../core/plugin-command";
import { PluginEvent } from "../../core/plugin-event";
import { PluginMessage } from "../types/plugin-message";
import {
  createMessageObservable,
  sendCommand,
} from "../utilities/create-message-observable";

type PluginEventMessage = PluginMessage<EventMessage<string[] | string>>;

const data$ = new Subject<string[] | string | undefined>();
const loading$ = new BehaviorSubject(true);

const handleEvents = map((message: EventMessage<string[] | string>) => {
  switch (message.event) {
    case PluginEvent.Selected.None: {
      sendCommand(PluginCommand.Retreive.Pages);
      break;
    }
    case PluginEvent.Retreived.Pages: {
      if (message.payload) {
        data$.next(message.payload as string[]);
      }
      loading$.next(false);
      break;
    }
    case PluginEvent.Selected.Page: {
      if (message.payload) {
        data$.next(message.payload as string);
      }
      loading$.next(false);
      break;
    }
    default: {
      throwError(() => `[view - handleEvents]: "${message.event}" unhandled.`);
      break;
    }
  }
});

const message$ = createMessageObservable<PluginEventMessage>().pipe(
  map((message) => message.data.pluginMessage),
  distinctUntilChanged(),
  handleEvents
);

export const usePluginEvents = () => {
  const data = useObservableState(data$);
  const loading = useObservableState(loading$);
  useSubscription(message$);
  return { data, loading };
};
