import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  OperatorFunction,
  tap,
} from "rxjs";
import {
  CommandMessage,
  EventMessage,
  MessageType,
  PluginMessage,
} from "../../core/message";
import { PluginCommand } from "../../core/plugin-command";
import { PluginEvent } from "../../core/plugin-event";

export const sendCommand = <T>(command: PluginCommand, payload?: T) => {
  const message: CommandMessage<T> = {
    type: MessageType.Command,
    command,
    payload,
  };
  parent.postMessage({ pluginMessage: message }, "*");
};

export const sendEvent = <T>(event: PluginEvent, payload?: T) => {
  const message: EventMessage<T> = {
    type: MessageType.Event,
    event,
    payload,
  };
  parent.postMessage({ pluginMessage: message }, "*");
};

export const createMessageObservable = <T>(
  handleEvents: OperatorFunction<EventMessage<T>, void>,
  events: PluginEvent[]
) =>
  fromEvent<MessageEvent<PluginMessage<EventMessage<T>>>>(
    window,
    "message"
  ).pipe(
    map((message) => message.data.pluginMessage),
    tap((message) => console.log(JSON.stringify(message, null, 2))),
    filter((message) => events.includes(message.event)),
    handleEvents
  );
