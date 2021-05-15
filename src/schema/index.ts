import {gql} from "apollo-server-express";

export const typeDefs = gql`
	type PeopleData {
		count: Int
		next: String
		previous: String
		people: [Person]!
	}
	type Person {
		name: String!
		height: String
		gender: String
		mass: String 
		homeworld: String
	}

	type Query {
		peopleData(page: Int, search: String): PeopleData!
		person(name: String!): PeopleData
	}
`;
