import { PeopleAPI } from '../datasources/people';
import { PlanetAPI } from '../datasources/planet';

type DataSourceType = {
  dataSources: {
    peopleAPI: PeopleAPI;
    planetAPI: PlanetAPI;
  };
};

export const resolvers = {
  PeopleResults: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.people) return 'PeopleData';
      if (obj.errorMessage) return 'NotFoundError';
    },
  },
  PersonResults: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.name) return 'AllPersonDetails';
      if (obj.errorMessage) return 'NotFoundError';
    },
  },
  Query: {
    peopleData: async (
      _: any,
      { page, search }: { page: number; search: string },
      { dataSources }: DataSourceType
    ) => {
      const allPeople = await dataSources.peopleAPI.getAllPeople(page, search);
      if (allPeople.people.length >= 1) {
        return {
          ...allPeople,
          __typename: 'PeopleData',
        };
      }
      return {
        __typename: 'NotFound',
        errorMessage: `People with the name ${search} do not exist.`,
      };
    },
    person: async (_: any, { name }: { name: string }, { dataSources }: DataSourceType) => {
      const person = await dataSources.peopleAPI.getPersonByName(name);

      if (person) {
        return {
          ...person,
          __typename: 'Person',
        };
      }

      return {
        __typename: 'NotFound',
        errorMessage: `Person with the name ${name} does not exist.`,
      };
    },
    planet: (_: any, { id }: { id: string }, { dataSources }: DataSourceType) =>
      dataSources.planetAPI.getPlanetById(id),
  },
};
