import { resolvers } from './';
import {
  mockPeopleDataResolverResponse,
  mockPersonResolverResponse,
  mockPlanetRosolverResponse,
} from './mocks';

describe('[Query.peopleData]', () => {
  const mockContext = {
    dataSources: {
      peopleAPI: {
        getAllPeople: jest.fn(),
      },
    },
  };

  const { getAllPeople } = mockContext.dataSources.peopleAPI;

  it('should call look from the people api', async () => {
    getAllPeople.mockReturnValueOnce([mockPeopleDataResolverResponse]);

    const response = await resolvers.Query.peopleData(null, {}, mockContext);
    expect(response).toEqual([mockPeopleDataResolverResponse]);
  });
});

describe('[Query.getPersonByName]', () => {
  const mockContext = {
    dataSources: {
      peopleAPI: {
        getPersonByName: jest.fn(),
      },
    },
  };

  const { getPersonByName } = mockContext.dataSources.peopleAPI;

  it('should call look from the people api', async () => {
    getPersonByName.mockReturnValueOnce(mockPersonResolverResponse);

    const response = await resolvers.Query.person(null, {}, mockContext);
    expect(response).toEqual(mockPersonResolverResponse);
  });
});

describe('[Query.getPlanetById]', () => {
  const mockContext = {
    dataSources: {
      planetAPI: {
        getPlanetById: jest.fn(),
      },
    },
  };

  const { getPlanetById } = mockContext.dataSources.planetAPI;

  it('should call look from the planet api', async () => {
    getPlanetById.mockReturnValueOnce(mockPlanetRosolverResponse);

    const response = await resolvers.Query.planet(null, {}, mockContext);
    expect(response).toEqual(mockPlanetRosolverResponse);
  });
});
