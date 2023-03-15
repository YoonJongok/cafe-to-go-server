import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./schema";
import client from "./client";
import { getAuthenticatedUser } from "./utils/users/getAuthenticatedUser";
import { PrismaClient, User } from "@prisma/client";

const app = express();

const httpServer = http.createServer(app);

interface MyContext {
  loggedInUser: Omit<User, "password"> | null;
  prisma: PrismaClient;
}

const main = async () => {
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req && req.headers["x-jwt"];
        return {
          loggedInUser: token ? await getAuthenticatedUser(token) : null,
          prisma: client,
        };
      },
    }),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main()
  .catch((e) => {
    console.error({ serverError: e });
  })
  .finally(async () => await client.$disconnect());
