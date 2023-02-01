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

app.get('/place', async (req, res) => {
  const newPlace = new Place({title: 'London Eye', description: 'Must-see place in London'});
  newPlace.save;
  res.send(newPlace);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
