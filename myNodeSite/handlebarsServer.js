// handlebarsServer.js
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars view engine
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Path to the public directory inside your myNodeSite directory
const publicDir = path.join(__dirname, "public");

// Serve static files from css, images, and js directories
app.use("/css", express.static(path.join(publicDir, "css")));
app.use("/images", express.static(path.join(publicDir, "images")));
app.use("/js", express.static(path.join(publicDir, "js")));

// Render pages based on path
app.get("/", (req, res) => {
  res.render("index", { title: "ClassConnect - Home" });
});

// For any routes that should point to sections on the index page, also render index.handlebars
app.get(["/about", "/contact", "/login", "/signup"], (req, res) => {
  res.render("index", { title: "ClassConnect - Home" });
});

// Catch-all handler for undefined routes (404)
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).render("500", { title: "500 - Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
