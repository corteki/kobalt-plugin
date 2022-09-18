import { useObservableState, useSubscription } from "observable-hooks";
import { filter, Subject } from "rxjs";
import { EventMessage } from "../../core/message";
import { PluginEvent } from "../../core/plugin-event";
import { PluginMessage } from "../types/plugin-message";
import { createMessageObservable } from "../utilities/create-message-observable";

type RetreivedPagesMessage = PluginMessage<EventMessage<string[]>>;

const pages$ = new Subject<string[]>();

const message$ = createMessageObservable<RetreivedPagesMessage>().pipe(
  filter(
    (message) =>
      message.data.pluginMessage.event === PluginEvent.Retreived.Pages
  )
);

const setNextPages = ({ data }: MessageEvent<RetreivedPagesMessage>) => {
  if (data.pluginMessage.payload) {
    pages$.next(data.pluginMessage.payload);
  }
};

export const usePages = () => {
  const pages = useObservableState(pages$);
  useSubscription(message$, setNextPages, console.error, console.info);
  return pages;
};
