const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

function getContentType(filePath) {
  const ext = path.extname(filePath);
  
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".ico": "image/x-icon"
  };
  
  return contentTypes[ext] || "text/plain";
}

// Serve a static file from the filesystem
function serveStaticFile(res, filePath) {
    // Check if there is no HTTP status message and set it to the code telling the browser that everything is okay
    if (!res.statusCode) {
        res.statusCode = 200;
    }

	// Try to read the requested file
	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code === "ENOENT") {
				// File not found - serve 404 page
				const notFoundPath = path.join(__dirname, "public", "404page.html");
				
				fs.readFile(notFoundPath, (err404, data404) => {
				if (err404) {
					// Even the 404 page couldn't be found - fallback to plain text
					res.writeHead(404, { "Content-Type": "text/plain" });
					res.end("404 - Page Not Found");
					console.error("404 page not found:", err404);
				} else {
					res.writeHead(404, { "Content-Type": "text/html" });
					res.end(data404);
				}
				});
			} else {
				// Server error (not a missing file)
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end("500 - Internal Server Error");
				console.error("Server error:", err);
			}
			return;
		}

		// File was found - determine content type and serve it
		const contentType = getContentType(filePath);
		res.writeHead(res.statusCode, { "Content-Type": contentType });
		res.end(data);
	});
}

const server = http.createServer((req, res) => {
		// Normalize the URL
		let url = req.url.split("?")[0].toLowerCase();

		// Remove trailing slashes if they exist
		if (url.endsWith("/")) {
			url = url.slice(0, -1); // Remove the trailing slash
		}

		// Default to index.html for root path
		if (url === "") {
			url = "/index.html";
		}

		// Add .html extension if no extension is provided
		if (path.extname(url) === "") {
			url = `${url}.html`;
		}

		// Create the file
		const filePath = path.join(__dirname, "public", url);

		// Serve the static file
		serveStaticFile(res, filePath);
	});

	server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
