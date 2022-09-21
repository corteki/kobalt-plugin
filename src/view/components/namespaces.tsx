import { useNamespaces } from "../hooks/use-namespaces";
import { Accordion } from "./accordion";
import { Error } from "./error";
import { CreateToken } from "./forms/create-token";
import { UpdateToken } from "./forms/update-token";

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
      {data.map(({ namespace, type, tokens }) => (
        <Accordion title={namespace} key={namespace}>
          <CreateToken namespace={namespace} type={type} />
          {tokens.map((token) => (
            <UpdateToken {...{ token, type, namespace }} />
          ))}
        </Accordion>
      ))}
    </>
  );
};
