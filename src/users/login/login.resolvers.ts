import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "src/types";
import { SECRET_DEV } from "src/utils/users/getAuthenticatedUser";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { prisma }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
          rejectOnNotFound: true,
        });

        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
          const token = jwt.sign(
            { id: user.id },
            process.env.NODE_ENV === "production" ? process.env.SECRET_KEY : SECRET_DEV,
          );

          return {
            ok: true,
            token,
          };
        } else {
          throw Error("Invalid password. Check again please.");
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
