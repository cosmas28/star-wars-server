export const mockPeopleDataResolverResponse = {
  __typename: 'PeopleData',
  count: 82,
  next: 'http://swapi.dev/api/people/?page=2,',
  previous: null,
  people: [
    {
      __typename: 'Person',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      homeworld: 'http://swapi.dev/api/planets/1/',
    },
  ],
};

export const mockPersonResolverResponse = mockPeopleDataResolverResponse.people[0];

export const mockPlanetRosolverResponse = {
  name: 'Tatooine',
  rotationPeriod: '23',
  orbitalPeriod: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
};
