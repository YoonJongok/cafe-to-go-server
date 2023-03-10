import { PrismaClient, User } from "@prisma/client";

export type PrismaContext = {
  loggedInUser: User | null;
  prisma: PrismaClient;
};

export type Resolver = (root: any, args: any, context: PrismaContext, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

declare module "http" {
  interface IncomingHttpHeaders {
    "x-jwt"?: string;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      PORT: string;
      AWS_ACCESS?: string;
      AWS_SECRET?: string;
      NODE_ENV: "production" | "development" | "test";
    }
  }
}
