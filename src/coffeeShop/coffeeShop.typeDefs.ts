import gql from "graphql-tag";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }

  type CoffeeShop {
    id: Int!
    name: String!
    slug: String!
    latitude: String!
    longitude: String!
    address: String
    description: String
    photos: [CoffeeShopPhoto]
    user: User!
    categories: [Category!]!
    likes: Int!
    isMine: Boolean!
    isLiked: Boolean!
    likedBy: User
    averageRating: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
    createdAt: String!
    updatedAt: String!
  }

  type ShopsResult {
    results: [CoffeeShop]
    totalPages: Int!
  }

  type Like {
    id: Int!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
`;
