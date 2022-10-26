const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  step: { type: Number },
  title: { type: String },
  description: { type: String },
});

module.exports = Timeline = mongoose.model("timeline", TimelineSchema);
