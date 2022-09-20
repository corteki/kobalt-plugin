import { Error } from "./components/error";
import { CreateNamespace } from "./components/forms/create-namespace";
import { SelectPage } from "./components/forms/select-page";
import { Namespaces } from "./components/namespaces";
import { Skeleton } from "./components/skeleton";
import { usePageSelection } from "./hooks/use-page-selection";

export const Plugin = () => {
  const { data, loading, error } = usePageSelection();

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <Skeleton height={32} />;
  }

  if (!data) {
    return <SelectPage />;
  }

  return (
    <>
      <p>{data}</p>
      <CreateNamespace />
      <Namespaces />
    </>
  );
};
