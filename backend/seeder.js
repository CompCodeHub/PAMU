const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DUMMY_PRODUCTS = require("./data/products");
const DUMMY_USERS = require("./data/users");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Order = require("./models/orderModel");

dotenv.config();

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");


  })
  .catch((err) => {
    console.log(err);
  });

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(DUMMY_USERS);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = DUMMY_PRODUCTS.map((product) => {
      return { ...product, creator: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
