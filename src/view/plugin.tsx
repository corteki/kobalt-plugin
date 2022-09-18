import { SelectPage } from "./components/forms/select-page";
import { usePluginEvents } from "./hooks/use-plugin-events";

export const Plugin = () => {
  const { data, loading } = usePluginEvents();

  if (loading || !data) {
    return <p>loading...</p>;
  }

  if (typeof data === "string") {
    return <p>{data}</p>;
  }

  return <SelectPage pages={data} />;
};
