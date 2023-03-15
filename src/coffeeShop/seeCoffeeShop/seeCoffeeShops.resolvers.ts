import { Resolver, Resolvers } from "src/types";

const getCoffeeShopById: Resolver = async (_, { id }, { prisma }) => {
  try {
    const found = await prisma.coffeeShop.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });

    if (!found) {
      throw new Error("CoffeeShop not found");
    }

    return found;
  } catch (error) {
    console.log(error);
  }
};
const getAllCoffeeShops: Resolver = async (_, __, { prisma }) => {
  try {
    const found = await prisma.coffeeShop.findMany({
      include: {
        categories: true,
      },
    });

    if (!found) {
      throw new Error("CoffeeShop not found");
    }

    return found;
  } catch (error) {
    console.log(error);
  }
};
const resolvers: Resolvers = {
  Query: {
    getCoffeeShopById,
    getAllCoffeeShops,
  },
};

export default resolvers;
