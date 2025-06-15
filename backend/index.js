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

  // Validate allowed values
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
      console.log(json.results);
      res.status(200).send(json.results);
    })
    .catch((err) => console.error(err));
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
