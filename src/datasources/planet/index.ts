import {RESTDataSource} from "apollo-datasource-rest";

export class PlanetAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://swapi.dev/api/planets/";
	}

	async getPlanet(planetURL: string) {
		const planetID = planetURL.replace(/[^0-9]/g,'');
		const response = await this.get(`${planetID}/`);

		return {
			...response,
			residents: response.residents.length,
			films: response.films.length,
		}
	}
}
