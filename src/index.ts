import {ApolloServer} from "apollo-server-express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {PeopleAPI} from "./datasources/people";
import {resolvers} from "./resolvers";
import {typeDefs} from "./schema";

dotenv.config();

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server started at Port: ${PORT}`)
});
