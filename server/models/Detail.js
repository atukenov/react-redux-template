const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  timeline: {
    label: {
      type: String,
    },
    status: {
      type: String,
    },
    started: {
      type: Date,
      default: Date.now(),
    },
    finished: {
      type: Date,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    comments: {
      type: String,
    },
    photos: [
      {
        title: { type: String },
        description: { type: String },
        url: { type: String },
      },
    ],
  },
  projectId: Schema.Types.ObjectId,
});

module.exports = Detail = mongoose.model("detail", DetailSchema);
