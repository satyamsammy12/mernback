const mongoose = require("mongoose");

const mongo_db = process.env.MONGO_DB;

mongoose
  .connect(mongo_db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
