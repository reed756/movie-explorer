export interface MovieResponse {
  page: Number;
  results: Movie[];
  total_pages: Number;
  total_results: Number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_id: number[];
  id: number;
  genres: { id: number, name: string }[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline: string;
}

export interface MovieListConfig {
  heading: string;
  toggles: { name: string, value: string }[];
}
