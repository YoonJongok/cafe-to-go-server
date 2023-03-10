import path from "path";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefsArray = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.ts"));
const resolversArray = loadFilesSync(
	path.join(__dirname, "./**/*.resolvers.ts")
);

const typeDefsArrayWithScalars = [scalarTypeDefs, ...typeDefsArray];

const typeDefs = mergeTypeDefs(typeDefsArrayWithScalars);
const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
