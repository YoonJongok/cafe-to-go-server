import { gql } from "graphql-tag";

export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
    shop: CoffeeShop
    # photos: [CoffeeShopPhoto]
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      description: String
      address: String
      categories: [String] # photos: [Upload]
    ): CreateCoffeeShopResult!
  }
`;
