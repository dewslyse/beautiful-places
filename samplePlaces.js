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

const samplePlaces = [
  {
    name: "Lake District",
    description: "A mountainous region in North West England known for its stunning lakes, valleys, and fells.",
    location: "Cumbria, England",
    latitude: 54.4609,
    longitude: -3.0886
  },
  {
    name: "Cornwall",
    description: "A county located in the south west of England known for its stunning beaches, coastal walks, and historic sites.",
    location: "Cornwall, England",
    latitude: 50.2660,
    longitude: -5.0527
  },
  {
    name: "Scottish Highlands",
    description: "A rugged and mountainous region in Scotland known for its breathtaking scenery, lochs, and wildlife.",
    location: "Scottish Highlands, Scotland",
    latitude: 57.0450,
    longitude: -4.6734
  },
  {
    name: "Isle of Skye",
    description: "A large island in the Inner Hebrides of Scotland known for its rugged landscapes, castles, and cultural heritage.",
    location: "Isle of Skye, Scotland",
    latitude: 57.5359,
    longitude: -6.2263
  },
  {
    name: "Yorkshire Dales",
    description: "A picturesque area in Northern England known for its rolling hills, limestone formations, and traditional villages.",
    location: "Yorkshire Dales, England",
    latitude: 54.2416,
    longitude: -2.1395
  },
  {
    name: "Isle of Wight",
    description: "An island off the south coast of England known for its beautiful beaches, historic sites, and natural beauty.",
    location: "Isle of Wight, England",
    latitude: 50.6927,
    longitude: -1.3167
  },
  {
    name: "Norfolk Broads",
    description: "A network of rivers and lakes in Norfolk, England, known for its boating, wildlife, and picturesque scenery.",
    location: "Norfolk, England",
    latitude: 52.6443,
    longitude: 1.5020
  },
  {
    name: "Peak District",
    description: "A national park in central England known for its rugged hills, valleys, and limestone caves.",
    location: "Peak District, England",
    latitude: 53.2389,
    longitude: -1.7494
  },
  {
    name: "The Cotswolds",
    description: "A region of rolling hills and picturesque villages in south central England, known for its quintessentially English charm.",
    location: "The Cotswolds, England",
    latitude: 51.9991,
    longitude: -1.7054
  },
  {
    name: "Bath",
    description: "A historic city in southwest England known for its Roman Baths, Georgian architecture, and charming city center.",
    location: "Bath, England",
    latitude: 51.3811,
    longitude: -2.3590
  },
  {
    name: "Giant's Causeway",
    description: "A natural wonder on the north coast of Northern Ireland known for its hexagonal basalt columns and coastal scenery.",
    location: "County Antrim, Northern Ireland",
    latitude: 55.2408,
    longitude: -6.5112
  },
  {
    name: "Isle of Lewis",
    description: "The largest island in the Outer Hebrides of Scotland, known for its rugged landscapes, historic sites, and cultural heritage.",
    location: "Isle of Lewis, Scotland",
    latitude: 58.2148,
    longitude: -6.3145
  },
  {
    name: "The Lake District Coast Aquarium",
    description: "An aquarium in Maryport, Cumbria, showcasing the marine life of the nearby Solway Firth and Irish Sea.",
    location: "Maryport, Cumbria, England",
    latitude: 54.7113,
    longitude: -3.4948
  },
  {
    name: "Durdle Door",
    description: "A natural limestone arch on the Jurassic Coast of Dorset, England, known for its stunning coastal scenery and beach.",
    location: "Dorset, England",
    latitude: 50.6180,
    longitude: -2.2748
  },
  {
    name: "St Ives",
    description: "A seaside town in Cornwall, England, known for its picturesque harbor, art galleries, and sandy beaches.",
    location: "St Ives, Cornwall, England",
    latitude: 50.2153,
    longitude: -5.4778
  }
];

Place.insertMany(samplePlaces)
  .then(res => console.log(res))
  .catch(e => console.log(e));

