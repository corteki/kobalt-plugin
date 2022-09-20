import { useNamespaces } from "../hooks/use-namespaces";
import { Accordion } from "./accordion";
import { Error } from "./error";
import { CreateToken } from "./forms/create-token";

import { NamespacesSkeleton } from "./namespaces-skeleton";

export const Namespaces = () => {
  const { data, loading, error } = useNamespaces();

  console.log(data);

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
      {data.map(({ namespace, tokens }) => (
        <Accordion title={namespace} key={namespace}>
          <CreateToken namespace={namespace} />
          {tokens.map(({ name, value }) => (
            <>
              <p>{name}</p>
              <p>{value}</p>
            </>
          ))}
        </Accordion>
      ))}
    </>
  );
};
