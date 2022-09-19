import { useObservableState, useSubscription } from "observable-hooks";
import { Subject, BehaviorSubject, Observable } from "rxjs";

type PluginSubscription<T, U> = {
  data?: T;
  loading: boolean;
  error?: U;
};

export const createPluginSubscription = <T, U>(
  message$: Observable<void>,
  data$: Subject<T>,
  loading$: BehaviorSubject<boolean>,
  error$: Subject<U>
): PluginSubscription<T, U> => {
  const data = useObservableState(data$);
  const loading = useObservableState(loading$);
  const error = useObservableState(error$);
  useSubscription(message$);
  return { data, loading, error };
};
