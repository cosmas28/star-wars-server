import {RESTDataSource} from "apollo-datasource-rest";
import dotenv from "dotenv";

dotenv.config();

type APIDataType = {
	count: number;
	next: string;
	previous: string;
	results: APIPersonDataType[];
};

export type APIPersonDataType = {
	name: string;
	height: string; 
	mass: string;
	hairColor: string; 
	skinColor: string;
	eyeColor: string;
	birthYear: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
};

type PeopleData = {
	count: number;
	next: string;
	previous: string;
	people: Person[];
};

type Person = {
	name: string;
	height: string;
	gender: string;
	mass: string;
	homeworld: string;
}

export class PeopleAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = process.env.STAR_WARS_BASE_URL;
	}

	peopleReducer(peopleData: APIDataType): PeopleData {
		return {
			count: peopleData.count,
			next: peopleData.next,
			previous: peopleData.previous,
			people: peopleData.results.map(person => this.personReducer(person)),
		}
	}

	personReducer(person: APIPersonDataType): Person {
		return {
			name: person.name,
			height: person.height,
			gender: person.gender,
			mass: person.mass,
			homeworld: person.homeworld,
		}
	}

	allPersonDetailsReducer(allPersonDetails: APIPersonDataType) {
		return {
			...allPersonDetails,
			films: allPersonDetails.films.length,
			species: allPersonDetails.species.length,
			vehicles: allPersonDetails.vehicles.length,
			starships: allPersonDetails.starships.length,
		}
	}

	async getAllPeople(page: number = 1, search: string = "") {
		const response = await this.get("people", {page, search});

		return this.peopleReducer(response);
	}

	async getPersonByName(name: string) {
		const response = await this.get("people", {search: name});

		return this.allPersonDetailsReducer(response.results[0]);
	}
}
