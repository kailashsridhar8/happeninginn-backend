const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },

  role: {
    type: String,
    default: "user",
  },

  

});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);
  console.log(user.password);
  console.log(user.email);
  console.log(password);
  return compare;
};

module.exports = mongoose.model("Users", userSchema);
