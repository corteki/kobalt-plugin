import { PluginEvent } from "./plugin-event";
import { PluginCommand } from "./plugin-command";

export enum MessageType {
  Event = "event",
  Command = "command",
}

export type Message<T, U> = {
  type: T;
  payload?: U;
};

export type CommandMessage<T = unknown> = Message<MessageType.Command, T> & {
  command: PluginCommand;
};

export type EventMessage<T = unknown> = Message<MessageType.Event, T> & {
  event: PluginEvent;
};
