const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// AniList API route
app.get("/api/search", async (req, res) => {
  const q = req.query.q || "anime";

  const query = `
    query ($search: String) {
      Page(perPage: 20) {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
          }
          description
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { search: q }
      })
    });

    const data = await response.json();
    res.json(data.data.Page.media);
  } catch (err) {
    res.status(500).send("Error fetching anime");
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});
