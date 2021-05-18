import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';

dotenv.config();

export class PlanetAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.STAR_WARS_BASE_URL;
  }

  async getPlanetById(id: string) {
    const response = await this.get(`planets/${id}/`);

    return {
      ...response,
      residents: response.residents.length,
      films: response.films.length,
    };
  }
}
