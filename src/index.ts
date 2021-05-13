import express, {Request, Response} from "express";
import cors from "cors";
import {ApolloServer, gql} from "apollo-server-express";

const PEOPLE = [
	{
		name: "Luke Skywalker",
		height: "172",
		gender: "male",
		mass: "77", 
		homeworld: "http://swapi.dev/api/planets/1/",
	},
	{
		name: "C-3PO",
		height: "167",
		gender: "n/a",
		mass: "75",
		homeworld: "http://swapi.dev/api/planets/1/",
	},
];

const typeDefs = gql`
	type Person {
		name: String!
		height: String
		gender: String
		mass: String 
		homeworld: String
	}

	type Query {
		people: [Person]!
		person(name: String!): Person
	}
`;

const resolvers = {
	Query: {
		people: () => PEOPLE,
	}
}

const app = express();
app.use(cors());
const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app, path: "/"});

app.listen(8000, () => {
	console.log("server Started at Port, 8000")
});
