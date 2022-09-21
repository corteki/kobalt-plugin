import { Subject, map, BehaviorSubject } from "rxjs";
import { EventMessage } from "../../core/message";
import { PluginCommand } from "../../core/plugin-command";
import { PluginEvent } from "../../core/plugin-event";
import {
  createMessageObservable,
  sendCommand,
} from "../utilities/create-message-observable";
import { createPluginSubscription } from "../utilities/create-plugin-subscription";

const data$ = new Subject<string | undefined>();
const error$ = new Subject<string | undefined>();
const loading$ = new BehaviorSubject(false);

const handleEvents = map((message: EventMessage<string>) => {
  loading$.next(true);
  switch (message.event) {
    case PluginEvent.Selected.None: {
      sendCommand(PluginCommand.Retreive.Pages);
      loading$.next(false);
      break;
    }
    case PluginEvent.Selected.Page: {
      if (message.payload) {
        data$.next(message.payload);
        sendCommand(PluginCommand.Retreive.Namespaces);
      }
      loading$.next(false);
      break;
    }

    default: {
      error$.next(`[usePageSelection]: "${message.event}" unhandled.`);
      loading$.next(false);
      break;
    }
  }
});

export const usePageSelection = () =>
  createPluginSubscription(
    createMessageObservable<string>(handleEvents, [
      PluginEvent.Selected.None,
      PluginEvent.Selected.Page,
    ]),
    data$,
    loading$,
    error$
  );
