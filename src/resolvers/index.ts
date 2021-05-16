import {PeopleAPI} from "../datasources/people";
import {PlanetAPI} from "../datasources/planet";

type DataSourceType = {
	dataSources: {
		peopleAPI: PeopleAPI;
		planetAPI: PlanetAPI;
	};
};

export const resolvers = {
	Query: {
		peopleData: (_: any, {page, search}: {page: number, search: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getAllPeople(page, search),
		person: (_: any, {name}: {name: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getPersonByName(name),
		planet: (_: any, {id}: {id: string}, {dataSources}: DataSourceType) => dataSources.planetAPI.getPlanet(id),
	}
}