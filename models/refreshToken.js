const mongoose = require("mongoose");

const refreshSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RefreshToken", refreshSchema);
