const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (name, email, password) {
  // Validation
  if (!name || !email || !password) {
    throw Error("All fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password isn't strong enough");
  }

  // Check if user exists
  const exists = this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use!");
  }

  // Generate bcrypt salt and hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ name, email, password: hash });

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
