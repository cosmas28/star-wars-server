import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { execute, toPromise } from 'apollo-link';
import { dataSources, typeDefs, resolvers, PlanetAPI, PeopleAPI, ApolloServer, server } from '.';

module.exports.toPromise = toPromise;

const constructTestServer = () => {
  const peopleAPI = new PeopleAPI();
  const planetAPI = new PlanetAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ peopleAPI, planetAPI }),
  });

  return { server, peopleAPI, planetAPI };
};

export { constructTestServer };
