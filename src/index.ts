import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { PeopleAPI } from './datasources/people';
import { PlanetAPI } from './datasources/planet';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

dotenv.config();

const dataSources = () => ({
  peopleAPI: new PeopleAPI(),
  planetAPI: new PlanetAPI(),
});

const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});
server.applyMiddleware({ app, path: '/' });

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
  });
}

export { dataSources, typeDefs, resolvers, PlanetAPI, PeopleAPI, ApolloServer, server, app };
