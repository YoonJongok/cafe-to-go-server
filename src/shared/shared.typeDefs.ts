import gql from "graphql-tag";

export default gql`
	type CommonResponse {
		ok: Boolean!
		id: Int
		error: String
	}
`;
