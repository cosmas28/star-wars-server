import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import { constructTestServer } from '../test_utils';

import { mockPeopleResponse } from '../datasources/people/mocks';
import { mockPlanetAPIResponse } from '../datasources/planet/mocks';

const GET_PEOPLE_DATA = gql`
  query GetPeopleData($page: Int, $search: String) {
    peopleData(page: $page, search: $search) {
      count
      people {
        name
        height
        gender
        mass
        homeworld
      }
    }
  }
`;

const GET_PERSON_DETAILS_BY_NAME = gql`
  query GetPersonDetails($name: String!) {
    person(name: $name) {
      name
      height
      mass
      hairColor
      skinColor
      eyeColor
      birthYear
      gender
      homeworld
      films
      species
      vehicles
      starships
      created
      edited
    }
  }
`;

const GET_PLANET_DETAILS_BY_ID = gql`
  query GetPlanetDetails($id: String!) {
    planet(id: $id) {
      name
      rotationPeriod
      orbitalPeriod
      diameter
      climate
      gravity
      terrain
      surfaceWater
      population
      residents
      films
      created
      edited
    }
  }
`;

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
