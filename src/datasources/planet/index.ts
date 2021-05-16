import {RESTDataSource} from "apollo-datasource-rest";

export class PlanetAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://swapi.dev/api/planets/";
	}

	async getPlanet(id: string) {
		const response = await this.get(`${id}/`);

		return {
			...response,
			residents: response.residents.length,
			films: response.films.length,
		}
	}
}
