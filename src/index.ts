import express, {Request, Response} from "express";
import cors from "cors";
import {ApolloServer, gql} from "apollo-server-express";

import {PeopleAPI} from "./datasources/people";

const typeDefs = gql`
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
		peopleData(page: Int): PeopleData!
		person(name: String!): PeopleData
	}
`;

type DataSourceType = {
	dataSources: {
		peopleAPI: PeopleAPI;
	};
};

const resolvers = {
	Query: {
		peopleData: (_: any, {page}: {page: number}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getAllPeople(page),
		person: (_: any, {name}: {name: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getPersonByName(name),
	}
}

const app = express();
app.use(cors());
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		peopleAPI: new PeopleAPI(),
	})
});
server.applyMiddleware({app, path: "/"});

app.listen(8000, () => {
	console.log("server Started at Port, 8000")
});
