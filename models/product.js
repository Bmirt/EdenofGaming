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

// router.post(
//   "/like/:product_id/review_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Product.findById(req.params.product_id).then(product => {
//         product.reviews
//           .findById(req.params.review_id)
//           .then(review => {
//             if (
//               review.likes.filter(like => like.user.toString() === req.user.id)
//                 .length > 0

//               // product.likes.filter(like => like.user.toString() === req.user.id)
//               //   .length > 0
//             ) {
//               console.log(product.reviews.map(review => review.likes.toString));
//               return res
//                 .status(400)
//                 .json({ alreadyliked: "User already liked this product" });
//             } else if (
//               product.reviews.filter(
//                 review =>
//                   review.dislikes.filter(
//                     dislike => dislike.user.toString() === req.user.id
//                   ).length > 0
//               ).length > 0

//               // product.dislikes.filter(
//               //   dislike => dislike.user.toString() === req.user.id
//               // ).length > 0
//             ) {
//               //Get remove index
//               const removeIndex = post.dislikes
//                 .map(item => item.user.toString())
//                 .indexOf(req.user.id);

//               //Splice out of array
//               post.dislikes.splice(removeIndex, 1);
//             }

//             //Add user id to likes array
//             post.likes.unshift({ user: req.user.id });

//             post.save().then(post => res.json(post));
//           })

//           .catch(err => {
//             console.log(err.name);
//             res.status(404).json({ postnotfound: "post not found" });
//           });
//       });
//     });
//   }
// );
