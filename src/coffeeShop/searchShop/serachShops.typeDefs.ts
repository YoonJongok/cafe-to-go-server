import gql from "graphql-tag";

export default gql`
  type Query {
    searchShopsByUserId(id: Int!): [CoffeeShop]
    searchShopsByTerm(term: String!): [CoffeeShop]
  }
`;
