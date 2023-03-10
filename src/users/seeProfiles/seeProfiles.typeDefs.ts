import gql from "graphql-tag";

export default gql`
  type ProfilesResult {
    total: Int!
    results: [User]!
  }

  type Query {
    seeProfiles(term: String!, lastId: Int): ProfilesResult!
  }
`;
