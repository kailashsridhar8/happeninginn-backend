const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  room_id: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
