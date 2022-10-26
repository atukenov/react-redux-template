const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chat = require("./Chat").schema;

const LogoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  comment: String,
  currentStep: {
    type: Number,
    default: 0,
  },
  steps: [Chat],
  userId: Schema.Types.ObjectId,
});

LogoSchema.pre("save", function (next) {
  if (!this.steps || this.steps.length == 0) {
    this.steps = [];
    for (let i = 1; i <= 9; ++i) {
      this.steps.push({ date: null, status: 0, chat: [] });
    }
  }
  next();
});

module.exports = Logo = mongoose.model("logo", LogoSchema);
