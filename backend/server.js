const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const orderRoutes = require("./routes/orders-routes");

const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// routes
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);

// Route for paypal
app.get("/api/config/paypal", (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));


//Handles unknown routes
app.use((req, res, next) => {
  res.status(404).json({message: "Unknown route"})
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
