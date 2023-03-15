import { loginOnlyProtector } from "src/utils/users/loginOnlyProtector";
import { Resolvers } from "../../types";
import { getOrCreate, processCategories } from "src/utils/coffeShop/processCategories";
import { Category } from "@prisma/client";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: loginOnlyProtector(
      async (_, { name, latitude, longitude, categories, address, description }, { loggedInUser, prisma }) => {
        try {
          const newCoffeeShopName = name.trim().toLowerCase();
          const newCoffeeShopSlug = newCoffeeShopName.replace(/ +/g, "-");
          const exist = await prisma.coffeeShop.findUnique({
            where: {
              slug: newCoffeeShopSlug,
            },
            select: { id: true },
          });
          if (exist) {
            return {
              ok: false,
              error: "이미 등록된 카페입니다.",
            };
          }

          let categoryObj: Category[] = [];
          if (categories) {
            categoryObj = await Promise.all(await getOrCreate(categories));
          }

          const newCoffeeShop = await prisma.coffeeShop.create({
            data: {
              name,
              ...(latitude && { latitude }),
              ...(longitude && { longitude }),
              ...(address && { address }),
              ...(description && { description }),
              slug: newCoffeeShopSlug,
              user: {
                connect: {
                  id: loggedInUser?.id,
                },
              },
              ...(categoryObj.length > 0 && {
                categories: { connectOrCreate: processCategories(categoryObj) },
              }),
            },
          });

          //   const coffeeShopPhotos = [];
          //   if (photos) {
          //     for (let i = 0; i < photos.length; i++) {
          //       //   const photoUrl = await uploadToS3(photos[i], loggedInUser.username, newCoffeeShopSlug);
          //       const coffeeShopPhoto = await prisma.coffeeShopPhoto.create({
          //         data: {
          //           //   url: photoUrl,
          //           shop: {
          //             connect: {
          //               id: newCoffeeShop.id,
          //             },
          //           },
          //         },
          //       });
          //       coffeeShopPhotos.push(coffeeShopPhoto);
          //     }
          //   }
          return {
            ok: true,
            shop: newCoffeeShop,
            // photos: coffeeShopPhotos,
          };
        } catch (error) {
          console.log(error);
        }
      },
    ),
  },
};

export default resolvers;
