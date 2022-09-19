import { usePageSelection } from "../hooks/use-page-selection";
import { Error } from "./error";
import { SelectPage } from "./forms/select-page";

export const PageSelection = () => {
  const { data, loading, error } = usePageSelection();

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <p>loading Page Selection...</p>;
  }

  if (!data) {
    return <SelectPage />;
  }

  return <p>{data}</p>;
};
