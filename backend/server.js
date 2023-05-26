const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();



//middleware
app.use(bodyParser.json())


// routes
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);


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
