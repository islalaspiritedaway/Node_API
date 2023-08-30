require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTENDEND = process.env.FRONTENDEND;

const options = {
  origin: FRONTENDEND,
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);

// routes
app.get("/", (req, res) => {
  res.send("Hello ");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.use(errorMiddleware);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Node API app is running at port ${PORT}`);
    });
    console.log("connected to MongoDB");
  })
  .catch((e) => console.log("Error: " + e));
