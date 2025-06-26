const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
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
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => console.error(err));
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
