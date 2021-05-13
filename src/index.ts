import {ApolloServer} from "apollo-server-express";
import express from "express";
import cors from "cors";

import {PeopleAPI} from "./datasources/people";
import {resolvers} from "./resolvers";
import {typeDefs} from "./schema";

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
