const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/new-buildings-project');


// Define a schema and model for investors
const investorSchema = new mongoose.Schema({
  name: String,
  nameBG: String,
  website: String,
  logo: String,
  contacts: String
});

const Investor = mongoose.model('Investor', investorSchema);

// Define a schema and model for buildings
const buildingSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  image: String,
  link: String,
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'Investor' }
});
const Building = mongoose.model('Building', buildingSchema);

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  created_at: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', commentSchema);

// building data API
app.get('/api/buildings', async (req, res) => {
  try {
    const buildings = await Building.find().populate('investor');
    res.json(buildings);
  } catch (err) {
    res.status(500).send(err);
  }
});
// investors data API
app.get('/api/investors', async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(500).send(err);
  }
});
// comments data API
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});
//investors
app.get('/investors', async (req, res) => {
  try {
    const investors = await Investor.find();
    res.render('investors', { investors });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));


// Define a route for the home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});