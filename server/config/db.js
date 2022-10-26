const mongoose = require("mongoose");
const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bf4gkcg.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB: ", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
