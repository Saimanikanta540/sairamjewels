require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sairam-jewels');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importCollections = async () => {
  try {
    await connectDB();

    const collectionItems = [
      {
        name: "Ethereal Rose Gold Ring",
        description: "Symbolizing eternal bonds with exceptional brilliance, featuring a delicate rose gold band.",
        price: 8500,
        images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"],
        category: "ring",
        materials: ["gold"]
      },
      {
        name: "Majestic Platinum Necklace",
        description: "Timeless elegance that graces every contour, crafted in pure platinum.",
        price: 12000,
        images: ["https://images.unsplash.com/photo-1599643477877-51446a3a9e46?auto=format&fit=crop&q=80&w=600"],
        category: "necklace",
        materials: ["platinum"]
      },
      {
        name: "Celestial Silver Earrings",
        description: "Capturing the light of a thousand stars with cascading silver drops.",
        price: 4500,
        images: ["https://images.unsplash.com/photo-1630019051930-47382dbdbef3?auto=format&fit=crop&q=80&w=600"],
        category: "earring",
        materials: ["silver"]
      },
      {
        name: "Royal Gold Cuff Bracelet",
        description: "Fluid grace for the modern silhouette, a bold statement in 18k yellow gold.",
        price: 15500,
        images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"],
        category: "bracelet",
        materials: ["gold"]
      },
      {
        name: "Heritage Platinum Watch",
        description: "Precision meets luxury in every second. Swiss movement encased in platinum.",
        price: 45000,
        images: ["https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=600"],
        category: "watch",
        materials: ["platinum"]
      },
      {
        name: "Bridal Diamond Masterpiece",
        description: "Crafting the beginning of your forever with a flawless 3-carat diamond ring.",
        price: 85000,
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600"],
        category: "bridal",
        materials: ["diamond", "platinum"],
        gemstones: ["Diamond"]
      },
      {
        name: "Luminous Halo Pendant",
        description: "A radiant center diamond surrounded by a halo of smaller stones.",
        price: 9200,
        images: ["https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=600"],
        category: "necklace",
        materials: ["diamond", "gold"],
        gemstones: ["Diamond"]
      },
      {
        name: "Midnight Sapphire Band",
        description: "An eternity band alternating between deep sapphires and diamonds.",
        price: 11000,
        images: ["https://images.unsplash.com/photo-1603561591411-071c4f72393a?auto=format&fit=crop&q=80&w=600"],
        category: "ring",
        materials: ["platinum"],
        gemstones: ["Sapphire", "Diamond"]
      },
      {
        name: "Art Deco Emerald Earrings",
        description: "Vintage-inspired geometric earrings featuring vivid green emeralds.",
        price: 14500,
        images: ["https://images.unsplash.com/photo-1588891823951-6d5ae81ca3f1?auto=format&fit=crop&q=80&w=600"],
        category: "earring",
        materials: ["gold"],
        gemstones: ["Emerald"]
      },
      {
        name: "Woven Silver Chain Bracelet",
        description: "Intricately woven sterling silver links for everyday luxury.",
        price: 2800,
        images: ["https://images.unsplash.com/photo-1573408302185-9303faf13fd3?auto=format&fit=crop&q=80&w=600"],
        category: "bracelet",
        materials: ["silver"]
      }
    ];

    const created = await Product.insertMany(collectionItems);
    console.log(`Successfully imported ${created.length} collection items!`);
    
    process.exit(0);
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importCollections();