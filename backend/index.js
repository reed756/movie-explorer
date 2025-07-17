const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = ["https://movie-explorer-angular.netlify.app/", "http://localhost:4200"];
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later.",
});
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(apiLimiter); // apply rate limiting middleware
app.use(express.json());
require("dotenv").config();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/api/free/:toggleValue", (req, res) => {
  const toggleValue = req.params.toggleValue;
  if (!["movie", "tv"].includes(toggleValue)) {
    return res.status(400).json({ error: "Invalid toggle value. Must be 'movie' or 'tv'." });
  }
  const url = `https://api.themoviedb.org/3/discover/${toggleValue}?with_watch_monetization_types=free`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
      "Access-Control-Allow-Origin": allowedOrigins,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.get("/api/popular/:toggleValue", (req, res) => {
  const toggleValue = req.params.toggleValue;
  if (!["now_playing", "upcoming", "top_rated", "popular"].includes(toggleValue)) {
    return res.status(400).json({ error: "Invalid toggle value. Must be 'now_playing', 'top_rated', 'popular' or 'upcoming'." });
  }
  const url = `https://api.themoviedb.org/3/movie/${toggleValue}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
      "Access-Control-Allow-Origin": allowedOrigins,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.get("/api/trending/:toggleValue", (req, res) => {
  const toggleValue = req.params.toggleValue;
  if (!["week", "day"].includes(toggleValue)) {
    return res.status(400).json({ error: "Invalid toggle value. Must be 'week', 'day'." });
  }
  const url = `https://api.themoviedb.org/3/trending/movie/${toggleValue}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
      "Access-Control-Allow-Origin": allowedOrigins,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.get("/api/movie/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Invalid movie ID." });
  }
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
      "Access-Control-Allow-Origin": allowedOrigins,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.get("/api/search/:query", (req, res) => {
  const query = req.params.query;
  if (!query) {
    return res.status(400).json({ error: "Invalid search query." });
  }
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
      "Access-Control-Allow-Origin": allowedOrigins,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
