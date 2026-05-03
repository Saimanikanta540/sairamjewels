require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Wishlist = require('./models/Wishlist');
const Order = require('./models/Order');
const CustomOrder = require('./models/CustomOrder');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sairam-jewels');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await CustomOrder.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Existing data cleared.');

    // 1. Seed Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@sairamjewels.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        name: 'Constance Sterling',
        email: 'constance@sterling.com',
        password: hashedPassword,
        role: 'user'
      }
    ]);

    const adminUser = createdUsers[0]._id;
    const standardUser = createdUsers[1]._id;

    console.log('Users seeded.');

    // 2. Seed Products
    const createdProducts = await Product.insertMany([
      {
        name: "The Imperial Emerald Cut Ring",
        description: "A breathtaking 5-carat emerald cut diamond set in a delicate platinum pavé band.",
        price: 125000,
        images: ["/placeholder-ring.jpg"],
        category: "Rings",
        materials: ["Platinum"],
        gemstones: ["Diamond"]
      },
      {
        name: "Midnight Sapphire Pendant",
        description: "A deep blue Ceylon sapphire encircled by brilliant-cut diamonds, suspended on an 18k white gold chain.",
        price: 45000,
        images: ["/placeholder-pendant.jpg"],
        category: "Necklaces",
        materials: ["18k White Gold"],
        gemstones: ["Sapphire", "Diamond"]
      },
      {
        name: "Art Deco Ruby Earrings",
        description: "Vintage-inspired drop earrings featuring cushion-cut rubies with geometric diamond halos.",
        price: 85000,
        images: ["/placeholder-earrings.jpg"],
        category: "Earrings",
        materials: ["18k Yellow Gold", "Platinum"],
        gemstones: ["Ruby", "Diamond"]
      }
    ]);

    const product1 = createdProducts[0]._id;
    const product2 = createdProducts[1]._id;
    const product3 = createdProducts[2]._id;

    console.log('Products seeded.');

    // 3. Seed Cart for standard user
    await Cart.create({
      userId: standardUser,
      items: [
        { productId: product1, quantity: 1 }
      ]
    });

    console.log('Cart seeded.');

    // 4. Seed Wishlist for standard user
    await Wishlist.create({
      userId: standardUser,
      products: [product2, product3]
    });

    console.log('Wishlist seeded.');

    // 5. Seed Order for standard user
    await Order.create({
      userId: standardUser,
      items: [
        { productId: product2, quantity: 1 }
      ],
      totalAmount: 45000,
      status: 'processing'
    });

    console.log('Orders seeded.');

    // 6. Seed Custom Order
    await CustomOrder.create({
      userId: standardUser,
      userPrompt: "I want a vintage looking ring with an emerald and gold.",
      aiResponse: "Here is your refined design brief for an 18k yellow gold ring featuring a step-cut Colombian emerald, surrounded by an Art Deco inspired halo of conflict-free diamonds...",
      status: 'pending'
    });

    console.log('Custom Orders seeded.');

    console.log('Data Imported Successfully!');
    process.exit();

  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();