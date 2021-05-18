import { PlanetAPI } from '../planet';
import { mockPlanetAPIResponse, transformedPlanetResponse } from '../planet/mocks';

const mocks = {
  get: jest.fn(),
};

const planetAPI = new PlanetAPI();
(planetAPI as any).get = mocks.get;

describe('[PlanetAPI.getPlanetById]', () => {
  it('should fetch a planet by id', async () => {
    mocks.get.mockReturnValueOnce(mockPlanetAPIResponse);
    const response = await planetAPI.getPlanetById('1');

    expect(response).toEqual(transformedPlanetResponse);
    expect(mocks.get).toBeCalledWith('1/');
  });
});
