const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

   

  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  rooms:
  [{ type: mongoose.SchemaTypes.ObjectId, ref: 'room' }],
 
  contact_no: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  breakfast:{
    type:Boolean,
  },
  offer:{
    type:String,
  }
});








module.exports = mongoose.model("hotel", hotelSchema);
