const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A smartphone must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A smartphone must have a name"],
      trim: true,
    },
    img: {
      type: String,
      required: [true, "A smartphone must have an image"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
