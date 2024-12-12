import { selectMovieById, selectPopularMovies, selectTrendingMovies } from "../models/movies.models";

export const getTrendingMovies = async (req: any, res: any, next: any) => {
  try {
    const { toggle } = req.params;
    const movies = await selectTrendingMovies(toggle);
    res.status(200).send({ movies });
  } catch (err) {
    next(err);
  }
}

export const getPopularMovies = async (req: any, res: any, next: any) => {
  try {
    const movies = await selectPopularMovies();
    res.status(200).send({ movies });
  } catch (err) {
    next(err);
  }
}

export const getMovieById = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const movie = await selectMovieById(id);
    res.status(200).send({ movie });
  } catch (err) {
    next(err);
  }
}
