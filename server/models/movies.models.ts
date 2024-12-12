import { client, config } from '../server';

export const selectTrendingMovies = async (toggle: any) => {
  const moviesResponse = await client.get(`trending/movie/${toggle}`, config);
  return moviesResponse.data;
}

export const selectPopularMovies = async () => {
  const moviesResponse = await client.get(`movie/popular`, config);
  return moviesResponse.data;
}

export const selectMovieById = async (id: any) => {
  const moviesResponse = await client.get(`movie/${id}`, config);
  return moviesResponse.data;
}
