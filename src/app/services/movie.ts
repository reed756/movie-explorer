export interface MovieResponse {
  page: Number;
  results: Movie[];
  total_pages: Number;
  total_results: Number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_id: Number[];
  id: Number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: Number;
  vote_count: Number;
}
