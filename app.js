import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import Place from './models/place.js';
import asyncWrapper from './helpers/asyncWrapper.js';
import ExpressError from './helpers/ExpressError.js';
import placeSchema from './schemas.js';

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

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(e => e.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/places', asyncWrapper(async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
}));

app.get('/places/new', (req, res) => {
  res.render('places/new');
});

app.post('/places', validatePlace, asyncWrapper(async (req, res, next) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect(`/places/${place._id}`);
}));

app.get('/places/:id', asyncWrapper(async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/show', { place });
}));

app.get('/places/:id/edit', asyncWrapper(async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/edit', { place });
}));

app.put('/places/:id', validatePlace, asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
  res.redirect(`/places/${place._id}`);
}));

app.delete('/places/:id', asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect('/places');
}));

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = 'Oh Snap!!! Something went wrong';
  res.status(status).render('error', { err });
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
