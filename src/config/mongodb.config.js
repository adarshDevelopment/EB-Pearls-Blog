const mongoose = require("mongoose");
const { MongoDbConfig } = require("./config");

// Immediately Invoked Function Expression(IIFE) to immediately invoke the function to connect to the MongoDB Atlas server
(async () => {
  try {
    await mongoose.connect(MongoDbConfig.mongoDbUrl);
    console.log("MongoDB connected");
  } catch (exception) {
    console.log("Error connecting to Mongo DB: ", exception.message);
  }
})();

/*
const connectDB = async () => {
  try {
    await mongoose.connect(MongoDbConfig.mongoDbUrl);
    console.log("MongoDB connected");
  } catch (exception) {
    console.log("Error connecting to Mongo DB: ", exception.message);
  }
};
*/
