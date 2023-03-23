import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/places', async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
});

app.get('/places/new', (req, res) => {
  res.render('places/new');
});

app.post('/places', async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect(`/places/${place._id}`);
});

app.get('/places/:id', async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/show', { place });
});

app.get('/places/:id/edit', async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/edit', { place });
});

app.put('/places/:id', async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
  res.redirect(`/places/${place._id}`);
});

app.delete('/places/:id', async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect('/places');
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
