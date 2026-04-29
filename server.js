const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Local video storage (temporary)
let videos = [];

// Get videos
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

// Upload video (admin only)
app.post("/api/upload", (req, res) => {
  const { title, url, key } = req.body;

  if (key !== "admin123") {
    return res.status(403).send("Unauthorized");
  }

  videos.push({ title, url });
  res.send("Uploaded");
});

// Search anime (Jikan API)
app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${q}`);
  const data = await response.json();
  res.json(data.data);
});

app.listen(PORT, () => console.log("Server running"));
