const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "6416e4052f890c4759a89a49",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price:'${price}',
      geometry: {
        type: "Point",
        coordinates: [-113, 47.0202],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dp59cdnxe/image/upload/v1679344766/YelpCamp/o5xsv1u1z80unfv1wsak.jpg",
          filename: "YelpCamp/o5xsv1u1z80unfv1wsak",
        },
        {
          url: "https://res.cloudinary.com/dp59cdnxe/image/upload/v1679344755/YelpCamp/ofhs9ooy3dnj4apxmxam.jpg",
          filename: "YelpCamp/ofhs9ooy3dnj4apxmxam",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

//6416e4052f890c4759a89a49
