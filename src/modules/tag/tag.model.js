const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    autoCreate: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", tagSchema);
