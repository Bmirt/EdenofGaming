const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  image: String,
  image2: String,
  genre: String,
  developer: String,
  release: String,
  platforms: String,
  price: {
    type: Number,
    required: true
  },
  trailer: String,
  description: String,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  reviews: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      dislikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      comments: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
