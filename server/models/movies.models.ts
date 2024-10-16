import { client, config } from '../server';

export const selectMovies = async (toggle: any) => {
  const moviesResponse = await client.get(`trending/movie/${toggle}`, config);
  return moviesResponse.data;
}
