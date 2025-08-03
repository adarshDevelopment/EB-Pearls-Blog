const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    maskedAccessToken: {
      type: String,
      required: true,
    },
    maskedRefreshToken: {
      type: String,
      required: true,
    },
  },
  {
    autoCreate: true,
    timestamps: true,
  }
);

module.exports = mongoose.model('Auth', AuthSchema);