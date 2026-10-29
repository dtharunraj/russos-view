
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "God of Thunder T-Shirt",
    category: "T-Shirts & Hoodies",
    price: 899,
    image: "/images/thor-tee.jpg",
    description: "Thor-inspired hero graphic T-shirt",
    stock: 20,
  },
  {
    name: "Stark Edition Watch",
    category: "Watches",
    price: 1499,
    image: "/images/stark-watch.jpg",
    description: "Premium superhero-inspired watch",
    stock: 15,
  },
  {
    name: "Multiverse Cap",
    category: "Caps & Hats",
    price: 599,
    image: "/images/multiverse-cap.jpg",
    description: "Everyday multiverse-themed cap",
    stock: 25,
  },
  {
    name: "Super Soldier Serum Collectible",
    category: "Serum Bottles & Collectibles",
    price: 749,
    image: "/images/serum.jpg",
    description: "Display collectible inspired by superhero stories",
    stock: 10,
  },
  {
    name: "Stormbreaker Collectible",
    category: "Thor Hammers & Props",
    price: 2499,
    image: "/images/stormbreaker.jpg",
    description: "Thor-inspired display prop",
    stock: 8,
  },
  {
    name: "Iron Man Helmet",
    category: "Iron Man Helmets",
    price: 3499,
    image: "/images/iron-man-helmet.jpg",
    description: "Iron Man-inspired collectible helmet",
    stock: 5,
  },
  {
    name: "Spider-Man Web-Shooters",
    category: "Action Figures & Collectibles",
    price: 1299,
    image: "/images/web-shooters.jpg",
    description: "Spider-Man-inspired web shooter collectible prop",
    stock: 12,
  },
  {
    name: "Mutant Legends Figure",
    category: "X-Men  Merchandise",
    price: 1799,
    image: "/images/xmen-figure.jpg",
    description: "Mutant-universe-inspired collectible",
    stock: 10,
  },
  
  {
    name: "Web Warrior Figure",
    category: "Spider-Man Collection",
    price: 1499,
    image: "/images/spiderman-figure.jpg",
    description: "Spider-Man-inspired display figure",
    stock: 15,
  },
  {
    name: "Infinity Stones Collector Set",
    category: "Infinity Saga",
    price: 2499,
    image: "/images/infinity-stones.jpg",
    description: "Collectible set featuring all six Infinity Stones",
    stock: 10,
  },
  {
    name: "Power Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/power-stone.jpg",
    description: "Purple Power Stone collectible",
    stock: 10,
  },
  {
    name: "Space Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/space-stone.jpg",
    description: "Blue Space Stone collectible",
    stock: 10,
  },
  {
    name: "Reality Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/reality-stone.jpg",
    description: "Red Reality Stone collectible",
    stock: 10,
  },
  {
    name: "Soul Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/soul-stone.jpg",
    description: "Orange Soul Stone collectible",
    stock: 10,
  },
  {
    name: "Time Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/time-stone.jpg",
    description: "Green Time Stone collectible",
    stock: 10,
  },
  {
    name: "Mind Stone",
    category: "Infinity Stones",
    price: 599,
    image: "/images/mind-stone.jpg",
    description: "Yellow Mind Stone collectible",
    stock: 10,
  },
  {
    name: "TVA TemPad",
    category: "Loki Collection",
    price: 1999,
    image: "/images/tva-tempad.jpg",
    description: "Loki-series-inspired TVA device collectible",
    stock: 8,
  },
  {
    name: "Miss Minutes Clock",
    category: "Loki Collection",
    price: 1299,
    image: "/images/miss-minutes-clock.jpg",
    description: "Loki-series-inspired Miss Minutes clock collectible",
    stock: 8,
  },

];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const product of products) {
      await Product.updateOne(
        { name: product.name },
        { $set: product },
        { upsert: true }
      );
    }

    console.log("Russo's View products added successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
