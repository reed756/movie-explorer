import express from 'express';
import { getMovieById, getPopularMovies, getTrendingMovies } from './controllers/movies.controllers';
import * as dotenv from "dotenv";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
dotenv.config({ path: '../.env' });

export const apiKey = process.env.API_KEY;
export const apiUrl = process.env.API_URL;

export const client = axios.create({
  baseURL: apiUrl,
});

export const config: AxiosRequestConfig = {
  headers: {
    'Accept': 'application/vnd.github+json',
    'Authorization': apiKey,
  } as RawAxiosRequestHeaders,
};

const app = express();
// Allow any method from any host and log requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
})
// Handle POST requests that come in formatted as JSON
app.use(express.json());
app.get('/trending/movie/:toggle', getTrendingMovies);
app.get('/movie/popular', getPopularMovies);
app.get('/movie/:id', getMovieById);
// start our server on port 4201
app.listen(4201, '127.0.0.1', () => {
  console.log("Server now listening on 4201");
});
