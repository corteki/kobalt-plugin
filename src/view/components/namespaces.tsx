import { useNamespaces } from "../hooks/use-namespaces";
import { Accordion } from "./accordion";
import { Error } from "./error";
import { CreateNamespace } from "./forms/create-namespace";
import { NamespacesSkeleton } from "./namespaces-skeleton";

export const Namespaces = () => {
  const { data, loading, error } = useNamespaces();

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <NamespacesSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <CreateNamespace />
      {data?.map((namespace) => (
        <Accordion title={namespace} key={namespace}>
          <p>content here...</p>
        </Accordion>
      ))}
    </>
  );
};
