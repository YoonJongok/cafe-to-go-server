import { PAGE_SIZE } from "src/client";
import { Resolvers } from "src/types";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Query: {
    seeProfiles: async (_, { term, lastId }, { prisma }) => {
      try {
        const whereUserInput: Prisma.UserWhereInput = {
          OR: [
            {
              username: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        };

        const total = await prisma.user.count({
          where: whereUserInput,
        });

        const results = await prisma.user.findMany({
          where: whereUserInput,
          take: PAGE_SIZE,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

        return {
          total,
          results,
        };
      } catch (error: any) {
        console.log({ error: error.message });
      }
    },
  },
};

export default resolvers;
