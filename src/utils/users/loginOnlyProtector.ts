import { Resolver } from "src/types";

type ProtectedResolver = (resolvedFn: Resolver) => Resolver;

export const loginOnlyProtector: ProtectedResolver = (ourResolver: Resolver) => {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const isQuery = info.operation.operation === "query";
      console.log({ isQuery });

      if (isQuery) {
        return null;
      } else {
        return {
          ok: false,
          error: "Permission Error",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
};
