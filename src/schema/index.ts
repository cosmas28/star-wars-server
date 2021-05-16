import {gql} from "apollo-server-express";

export const typeDefs = gql`
	type PeopleData {
		count: Int
		next: String
		previous: String
		people: [BasicPersonDetails]!
	}
	type BasicPersonDetails {
		name: String!
		height: String
		gender: String
		mass: String 
		homeworld: String
	}
	type AllPersonDetails {
		name: String
		height: String 
		mass: String
		hairColor: String 
		skinColor: String
		eyeColor: String
		birthYear: String
		gender: String
		homeworld: String
		films: Int
		species: Int
		vehicles: Int
		starships: Int
		created: String
		edited: String
		url: String
	}
	type Planet {
		name: String 
    rotationPeriod: String
    orbitalPeriod:String
    diameter: String 
    climate: String 
    gravity: String 
    terrain: String
    surfaceWater: String 
    population: String
		residents: Int
		films: Int
		created: String 
    edited: String
	}

	type Query {
		peopleData(page: Int, search: String): PeopleData!
		person(name: String!): AllPersonDetails
		planet(id: String!): Planet
	}
`;
