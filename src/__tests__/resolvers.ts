import { resolvers } from '../resolvers';
import {
  mockPeopleDataResolverResponse,
  mockPersonResolverResponse,
  mockPlanetRosolverResponse,
} from '../resolvers/mocks';

const mockContext: any = {
  dataSources: {
    peopleAPI: {
      getAllPeople: jest.fn(),
      getPersonByName: jest.fn(),
    },
    planetAPI: {
      getPlanetById: jest.fn(),
    },
  },
};

describe('[Query.peopleData]', () => {
  const { getAllPeople } = mockContext.dataSources.peopleAPI;

  it('should call lookup from the people api', async () => {
    getAllPeople.mockReturnValueOnce([mockPeopleDataResolverResponse]);

    const response = await resolvers.Query.peopleData(null, {page: 1, search: ''}, mockContext);
    expect(response).toEqual([mockPeopleDataResolverResponse]);
  });
});

describe('[Query.getPersonByName]', () => {
  const { getPersonByName } = mockContext.dataSources.peopleAPI;

  it('should call lookup from the people api', async () => {
    getPersonByName.mockReturnValueOnce(mockPersonResolverResponse);

    const response = await resolvers.Query.person(null, {name: ''}, mockContext);
    expect(response).toEqual(mockPersonResolverResponse);
  });
});

describe('[Query.getPlanetById]', () => {
  const { getPlanetById } = mockContext.dataSources.planetAPI;

  it('should call lookup from the planet api', async () => {
    getPlanetById.mockReturnValueOnce(mockPlanetRosolverResponse);

    const response = await resolvers.Query.planet(null, {id: ''}, mockContext);
    expect(response).toEqual(mockPlanetRosolverResponse);
  });
});
