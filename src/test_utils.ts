import { toPromise } from 'apollo-link';
import { typeDefs, resolvers, PlanetAPI, PeopleAPI, ApolloServer } from '.';

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

export { constructTestServer, toPromise };
