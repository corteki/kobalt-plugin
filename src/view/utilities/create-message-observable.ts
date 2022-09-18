import { fromEvent } from "rxjs";
import { CommandMessage, EventMessage, MessageType } from "../../core/message";
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

export const createMessageObservable = <T>() =>
  fromEvent<MessageEvent<T>>(window, "message");
