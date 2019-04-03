const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    max: 40
  },
  age: {
    type: Number
  },
  profileImage: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  bio: {
    type: String
  },
  cart: [],
  purchases: [],
  githubusername: {
    type: String
  },
  balance: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
