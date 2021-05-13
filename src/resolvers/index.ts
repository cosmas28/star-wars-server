import {PeopleAPI} from "../datasources/people";

type DataSourceType = {
	dataSources: {
		peopleAPI: PeopleAPI;
	};
};

export const resolvers = {
	Query: {
		peopleData: (_: any, {page}: {page: number}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getAllPeople(page),
		person: (_: any, {name}: {name: string}, {dataSources}: DataSourceType) => dataSources.peopleAPI.getPersonByName(name),
	}
}