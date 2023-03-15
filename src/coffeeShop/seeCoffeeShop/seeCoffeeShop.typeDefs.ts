import gql from "graphql-tag";

export default gql`
  type Query {
    getCoffeeShopById(id: Int!): CoffeeShop
    getAllCoffeeShops: [CoffeeShop]
  }
`;
