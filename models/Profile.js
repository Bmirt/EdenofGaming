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
    required: true,
    max: 40
  },
  age: {
    type: Number,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String,
    required: true
  },
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
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
