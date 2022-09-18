import { useSubscription, useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import type { PluginMessage } from "../types/plugin-message";
import { createMessageObservable } from "../utilities/create-message-observable";

type Frames = string[];
type CurrentFrames = { frames: Frames };
type CurrentFramesMessage = PluginMessage<CurrentFrames>;

const frames$ = new BehaviorSubject<Frames>([]);

const message$ = createMessageObservable<CurrentFramesMessage>();

const setNextFrames = ({ data }: MessageEvent<CurrentFramesMessage>) => frames$.next(data.pluginMessage.frames);

export const useFrames = () => {
  const frames = useObservableState(frames$);
  useSubscription(message$, setNextFrames, console.error, console.info);
  return frames;
};
