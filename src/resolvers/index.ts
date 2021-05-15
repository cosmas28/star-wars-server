import {PeopleAPI} from "../datasources/people";

type DataSourceType = {
	dataSources: {
		peopleAPI: PeopleAPI;
	};
};

export const resolvers = {
	Query: {
		peopleData: (_: any, {page, search}: {page: number, search: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getAllPeople(page, search),
		person: (_: any, {name}: {name: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getPersonByName(name),
	}
}