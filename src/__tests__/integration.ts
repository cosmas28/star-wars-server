import { createTestClient } from 'apollo-server-testing';

import { constructTestServer } from '../test_utils';
import { mockPeopleResponse } from '../datasources/people/mocks';
import { mockPlanetAPIResponse } from '../datasources/planet/mocks';
import {
  GET_PEOPLE_DATA,
  GET_PERSON_DETAILS_BY_NAME,
  GET_PLANET_DETAILS_BY_ID,
} from '../test_queries';

describe('Queries', () => {
  it('should fetch all people', async () => {
    const { server, peopleAPI } = constructTestServer();

    peopleAPI.get = jest.fn(() => [mockPeopleResponse]) as any;

    const { query } = createTestClient(server);
    const response = await query({ query: GET_PEOPLE_DATA });

    expect(response).toMatchSnapshot();
  });

  it('should fetch a person by name', async () => {
    const { server, peopleAPI } = constructTestServer();

    peopleAPI.get = jest.fn(() => [mockPeopleResponse]) as any;

    const { query } = createTestClient(server);
    const response = await query({
      query: GET_PERSON_DETAILS_BY_NAME,
      variables: { name: 'Luke Skywalker' },
    });

    expect(response).toMatchSnapshot();
  });

  it('should fetch a planet by id', async () => {
    const { server, planetAPI } = constructTestServer();

    planetAPI.get = jest.fn(() => [mockPlanetAPIResponse]) as any;

    const { query } = createTestClient(server);
    const response = await query({ query: GET_PLANET_DETAILS_BY_ID, variables: { id: '1' } });

    expect(response).toMatchSnapshot();
  });
});
