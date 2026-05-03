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

const ringImages = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1603561591411-071c4f72393a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1598560912005-794762bcbc1c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1627225924766-515836af44f3?auto=format&fit=crop&q=80&w=600"
];

const necklaceImages = [
  "https://images.unsplash.com/photo-1599643477877-51446a3a9e46?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1616606103915-cbc747b628aa?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1611085583191-a3b13b8401d1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1652174381156-324330f89078?auto=format&fit=crop&q=80&w=600"
];

const earringImages = [
  "https://images.unsplash.com/photo-1630019051930-47382dbdbef3?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1588891823951-6d5ae81ca3f1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1629227314418-000a3698ff42?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=600"
];

const braceletImages = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1573408302185-9303faf13fd3?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1540331547168-8b63100a7317?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1551133047-bf8eff12f664?auto=format&fit=crop&q=80&w=600"
];

const watchImages = [
  "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1587836374828-4dbaba94ee0e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600"
];

const bridalImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1598560912140-5fbd41c8882a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1546167104-d4b1b16c19f5?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1595914041131-419b6716a40a?auto=format&fit=crop&q=80&w=600"
];

const updateImages = async () => {
  try {
    await connectDB();
    const products = await Product.find({});
    
    let updateCount = 0;

    for (const product of products) {
      const category = product.category.toLowerCase();
      let newImages = [];

      if (category.includes('ring')) {
        newImages = [...ringImages];
      } else if (category.includes('necklace')) {
        newImages = [...necklaceImages];
      } else if (category.includes('earring')) {
        newImages = [...earringImages];
      } else if (category.includes('bracelet')) {
        newImages = [...braceletImages];
      } else if (category.includes('watch')) {
        newImages = [...watchImages];
      } else if (category.includes('bridal')) {
        newImages = [...bridalImages];
      } else {
        newImages = [...ringImages]; // Default fallback
      }

      // Slightly shuffle or rotate images for variety if there are multiple of same category
      if (updateCount % 2 !== 0) {
        newImages.push(newImages.shift()); // move first to last
      }

      product.images = newImages;
      await product.save();
      updateCount++;
    }

    console.log(`Successfully updated images for ${updateCount} products!`);
    process.exit(0);
  } catch (error) {
    console.error(`Error updating images: ${error}`);
    process.exit(1);
  }
};

updateImages();