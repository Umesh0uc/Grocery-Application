const express = require('express');
const path = require('path');

const app = express();
// Use port 3000 by default, or whatever the environment variable specifies
const PORT = process.env.PORT || 3000;

// The path to your compiled Vite files (the dist folder)
const DIST_DIR = path.join(__dirname, 'dist');

// 1. Serve static files (HTML, CSS, JS, images) from the dist directory
app.use(express.static(DIST_DIR));

// 2. Catch-all route for Single Page Applications (SPA)
// If a user refreshes the page at /about, Express won't find an about.html file.
// This tells Express: "For any route you don't recognize, just serve index.html 
// and let React Router handle the URL."
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ React app is being served on http://localhost:${PORT}`);
});