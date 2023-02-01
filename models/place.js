import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  location: String
});

const Place = mongoose.model('Place', placeSchema);

export default Place;