const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Path to the public directory in your myNodeSite directory
const publicDir = path.join(__dirname, "public");

// Serve static files for css, images, and js directories
app.use("/css", express.static(path.join(publicDir, "css")));
app.use("/images", express.static(path.join(publicDir, "images")));
app.use("/js", express.static(path.join(publicDir, "js")));

// Serve index.html for the root path and for paths that represent sections in the index page
app.get(["/", "/about", "/contact", "/login", "/signup"], (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// Wildcard route: serve the 404 page for any undefined routes
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "404page.html"));
});

// Start the server and log the URL to access the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
