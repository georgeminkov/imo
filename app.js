const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Read building data from JSON file
const buildingsData = JSON.parse(fs.readFileSync('data.json'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.render('index', { buildings: buildingsData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});