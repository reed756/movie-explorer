import { selectMovies } from "../models/movies.models";

export const getMovies = async (req: any, res: any, next: any) => {
  try {
    const { toggle } = req.params;
    const movies = await selectMovies(toggle);
    res.status(200).send({ movies });
  } catch (err) {
    next(err);
  }
}
