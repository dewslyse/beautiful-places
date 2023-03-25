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
    longitude: -3.0886,
    image: "https://images.unsplash.com/photo-1581976043943-0d8b584c093f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
  },
  {
    name: "Cornwall",
    description: "A county located in the south west of England known for its stunning beaches, coastal walks, and historic sites.",
    location: "Cornwall, England",
    latitude: 50.2660,
    longitude: -5.0527,
    image: "https://images.unsplash.com/photo-1488289209768-16ceec3f0b22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
  },
  {
    name: "Scottish Highlands",
    description: "A rugged and mountainous region in Scotland known for its breathtaking scenery, lochs, and wildlife.",
    location: "Scottish Highlands, Scotland",
    latitude: 57.0450,
    longitude: -4.6734,
    image: "https://images.unsplash.com/photo-1566320238883-4f3684cb3795?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Isle of Skye",
    description: "A large island in the Inner Hebrides of Scotland known for its rugged landscapes, castles, and cultural heritage.",
    location: "Isle of Skye, Scotland",
    latitude: 57.5359,
    longitude: -6.2263,
    image: "https://images.unsplash.com/photo-1677470914569-52d91c01678b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Yorkshire Dales",
    description: "A picturesque area in Northern England known for its rolling hills, limestone formations, and traditional villages.",
    location: "Yorkshire Dales, England",
    latitude: 54.2416,
    longitude: -2.1395,
    image: "https://images.unsplash.com/photo-1579640147658-d55b02680b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  },
  {
    name: "Isle of Wight",
    description: "An island off the south coast of England known for its beautiful beaches, historic sites, and natural beauty.",
    location: "Isle of Wight, England",
    latitude: 50.6927,
    longitude: -1.3167,
    image: "https://images.unsplash.com/photo-1617972585645-451b916f0e59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Norfolk Broads",
    description: "A network of rivers and lakes in Norfolk, England, known for its boating, wildlife, and picturesque scenery.",
    location: "Norfolk, England",
    latitude: 52.6443,
    longitude: 1.5020,
    image: "https://images.unsplash.com/photo-1651739349597-0e49f9c683ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80"
  },
  {
    name: "Peak District",
    description: "A national park in central England known for its rugged hills, valleys, and limestone caves.",
    location: "Peak District, England",
    latitude: 53.2389,
    longitude: -1.7494,
    image: "https://images.unsplash.com/photo-1609667691778-1fab97c95c5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
  },
  {
    name: "The Cotswolds",
    description: "A region of rolling hills and picturesque villages in south central England, known for its quintessentially English charm.",
    location: "The Cotswolds, England",
    latitude: 51.9991,
    longitude: -1.7054,
    image: "https://images.unsplash.com/photo-1511116077242-88eacbbaab1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
  },
  {
    name: "Bath",
    description: "A historic city in southwest England known for its Roman Baths, Georgian architecture, and charming city center.",
    location: "Bath, England",
    latitude: 51.3811,
    longitude: -2.3590,
    image: "https://images.unsplash.com/photo-1590161532861-cf03cf433f4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Giant's Causeway",
    description: "A natural wonder on the north coast of Northern Ireland known for its hexagonal basalt columns and coastal scenery.",
    location: "County Antrim, Northern Ireland",
    latitude: 55.2408,
    longitude: -6.5112,
    image: "https://images.unsplash.com/photo-1550091647-480b09ff909d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Isle of Lewis",
    description: "The largest island in the Outer Hebrides of Scotland, known for its rugged landscapes, historic sites, and cultural heritage.",
    location: "Isle of Lewis, Scotland",
    latitude: 58.2148,
    longitude: -6.3145,
    image: "https://images.unsplash.com/photo-1649549652161-b1be49ebf040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
  },
  {
    name: "The Lake District Coast Aquarium",
    description: "An aquarium in Maryport, Cumbria, showcasing the marine life of the nearby Solway Firth and Irish Sea.",
    location: "Maryport, Cumbria, England",
    latitude: 54.7113,
    longitude: -3.4948,
    image: "https://images.unsplash.com/photo-1654098895505-bd7dfde89f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Durdle Door",
    description: "A natural limestone arch on the Jurassic Coast of Dorset, England, known for its stunning coastal scenery and beach.",
    location: "Dorset, England",
    latitude: 50.6180,
    longitude: -2.2748,
    image: "https://images.unsplash.com/photo-1510088898151-1d75b6e925f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "St Ives",
    description: "A seaside town in Cornwall, England, known for its picturesque harbor, art galleries, and sandy beaches.",
    location: "St Ives, Cornwall, England",
    latitude: 50.2153,
    longitude: -5.4778,
    image: "https://images.unsplash.com/photo-1601381711038-a728e8d7f45f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1231&q=80"
  }
];

Place.insertMany(samplePlaces)
  .then(res => console.log(res))
  .catch(e => console.log(e));

