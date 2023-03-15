import { Category } from "@prisma/client";
import client from "src/client";

export const getOrCreate = async (categories: string[]) => {
  return categories.map(async (category) => {
    const trimCategory = category.trim().toLowerCase();
    const categorySlug = trimCategory.replace(/ +/g, "-");
    let existCategory = await client.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });
    if (!existCategory) {
      existCategory = await client.category.create({
        data: {
          name: category,
          slug: categorySlug,
        },
      });
    }
    return existCategory;
  });
};

export const processCategories = (categories: Category[]) => {
  return categories.map((category: Category) => ({
    where: { slug: category.slug },
    create: { slug: category.slug, name: category.name },
  }));
};
