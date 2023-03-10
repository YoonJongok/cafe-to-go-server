import gql from "graphql-tag";

export default gql`
  type Mutation {
    editProfile(
      id: Int!
      username: String
      email: String
      password: String
      name: String
      location: String
      githubUsername: String
    ): CommonResponse!
  }
`;
