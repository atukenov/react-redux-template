const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  date: { type: Date },
  status: { type: Number, default: 0 },
  chat: [
    {
      message: { type: String },
      sender: { type: Boolean },
    },
  ],
});

// 0 - not started
// 1 - in process
// 2 - completed

module.exports = Chat = mongoose.model("chat", ChatSchema);
