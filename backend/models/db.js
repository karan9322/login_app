const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected......");
  })
  .catch((e) => {
    console.log("error while connecting database", e);
  });
