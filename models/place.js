import mongoose from "mongoose";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  location: String,
  image: String
});

const Place = mongoose.model('Place', placeSchema);

export default Place;