import { Button, Flex } from "@radix-ui/themes";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { getAuth } from "@workos/authkit-tanstack-react-start/serverFns";

const apiRequestQueryOptions = queryOptions({
  queryKey: ["api-request"],
  queryFn: async () => {
    const response = await fetch("http://localhost:3000/api-request", {
      method: "POST",
      body: JSON.stringify({ message: "Hello, world!" }),
    });
    return response.json();
  },
});

export const Route = createFileRoute("/api-request")({
  server: {
    handlers: {
      POST: async () => {
        const auth = await getAuth();
        console.log("server handler", auth);
        const name = auth.user?.firstName ?? "anon";
        return json({
          message: `Hello, ${name}!`,
        });
      },
    },
  },
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(
      apiRequestQueryOptions,
    );
    console.log("In loader", {
      isServer: typeof window === "undefined",
      data: data.message,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const clientQuery = useQuery(apiRequestQueryOptions);

  console.log("In component", {
    isServer: typeof window === "undefined",
    data: clientQuery.data.message,
  });
  return (
    <Flex direction="column" gap="2">
      {clientQuery.data?.message}
      <Button
        onClick={() => {
          clientQuery.refetch();
        }}
      >
        Refetch
      </Button>
    </Flex>
  );
}
