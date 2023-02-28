import express from 'express';
import mongoose from 'mongoose';
import Place from './models/place.js';

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/beautiful-places', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/places', async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
});

app.get('/places/:id', async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/show', { place });
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
