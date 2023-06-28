const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const orderRoutes = require("./routes/orders-routes");
const uploadRoutes = require("./routes/uploads-routes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

// Route for paypal
app.get("/api/config/paypal", (req, res) =>
  res.send({ id: process.env.PAYPAL_CLIENT_ID })
);



if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "../frontend/build/")));

  // any route that is not defined above will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend",  "build",  "index.html"));
  });
} 

//Handles unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Unknown route" });
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");

    // Listening on port
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
  })
  .catch((err) => {
    console.log(err);
  });
