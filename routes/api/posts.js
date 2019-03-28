const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const Product = require("../../models/product");

// Validation
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests post route
// @access Public

router.get("/test", (req, res) =>
  res.json({
    msg: "Posts Works"
  })
);

// @route  GET api/posts/:productid
// @desc   get posts on certain product
// @access Public
router.get("/:product_id", (req, res) => {
  Product.findById(req.params.product_id)
    .then(product => {
      console.log(product);
      res.json(product.reviews);
    })
    .catch(err => {
      console.log(err.stack);
      return res.status(404).json({ nopostfound: "no posts found" });
    });
});

// @route  GET api/posts/:id
// @desc   get posts by id
// @access Public
// router.get("/:id", (req, res) => {
//   console.log(req.id);
//   Post.findById(req.params.id)
//     .then(post => res.json(post))
//     .catch(err =>
//       res.status(404).json({ nopostfound: "no post found with that id" })
//     );
// });

// @route  POST api/posts
// @desc   Create Post
// @access Private
router.post(
  "/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Product.findById(req.params.product_id)

      .then(product => {
        const newPost = {
          _id: new mongoose.Types.ObjectId(),
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id
        };

        //Add to comments array
        product.reviews.unshift(newPost);

        // Save
        product.save().then(product => res.json(newPost));
      })
      .catch(err =>
        res.status(404).json({ productnotfound: "No product found" })
      );
  }
);

// @route  DELETE api/posts/:id
// @desc   Delete Post
// @access Private

router.delete(
  "/:product_id/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.product_id);
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id)
        .then(product => {
          //check for product owner
          if (
            product.reviews.filter(
              review => review._id.toString() === req.params.id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: "comment does not exist" });
          }
          // Get remove index
          const removeIndex = product.reviews
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          //Splice comment out of array
          product.reviews.splice(removeIndex, 1);

          product.save().then(product => res.json(product));
        })
        .catch(err => {
          return res.status(404).json({ postnotfound: "post not found" });
        });
    });
  }
);

// @route  POST api/posts/like/:id
// @desc   Like Post
// @access Private

router.post(
  "/like/:product_id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id)
        .then(product => {
          var ourReview;
          for (var i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].id === req.params.review_id) {
              ourReview = product.reviews[i];
              console.log(product.reviews[i]);
            }
          }
          if (
            ourReview.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0

            // product.likes.filter(like => like.user.toString() === req.user.id)
            //   .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this product" });
          } else if (
            ourReview.dislikes.filter(
              dislike => dislike.user.toString() === req.user.id
            ).length > 0

            // product.dislikes.filter(
            //   dislike => dislike.user.toString() === req.user.id
            // ).length > 0
          ) {
            //Get remove index
            const removeIndex = ourReview.dislikes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //Splice out of array
            ourReview.dislikes.splice(removeIndex, 1);
          }

          //Add user id to likes array
          ourReview.likes.unshift({ user: req.user.id });

          product.save();
          return res.status(404).json(ourReview);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(404).json({ postnotfound: "review not found" });
        });
    });
  }
);

// @route  POST api/posts/unlike/:id
// @desc   Like Post
// @access Private

router.post(
  "/unlike/:product_id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id)
        .then(product => {
          var ourReview;
          for (var i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].id === req.params.review_id) {
              ourReview = product.reviews[i];
            }
          }
          if (
            ourReview.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this review" });
          }

          //Get remove index
          const removeIndex = ourReview.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          ourReview.likes.splice(removeIndex, 1);

          //Save
          product.save();
          return res.status(404).json(ourReview);
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "review not found" })
        );
    });
  }
);

// @route  POST api/posts/dislike/:id
// @desc   dislike Post
// @access Private

router.post(
  "/dislike/:product_id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id)
        .then(product => {
          var ourReview;
          for (var i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].id === req.params.review_id) {
              ourReview = product.reviews[i];
            }
          }
          if (
            ourReview.dislikes.filter(
              dislike => dislike.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadydisliked: "User already liked this review" });
          } else if (
            ourReview.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //Get remove index
            const removeIndex = ourReview.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //Splice out of array
            ourReview.likes.splice(removeIndex, 1);
          }

          //Add user id to dislikes array
          ourReview.dislikes.unshift({ user: req.user.id });

          product.save();
          return res.status(404).json(ourReview);
        })
        .catch(err => {
          console.log(err.stack);
          res.status(404).json({ postnotfound: "post not found" });
        });
    });
  }
);

// @route  POST api/posts/undislike/:id
// @desc   undislike Post
// @access Private

router.post(
  "/undislike/:product_id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id)
        .then(product => {
          var ourReview;
          for (var i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i].id === req.params.review_id) {
              ourReview = product.reviews[i];
            }
          }
          if (
            ourReview.dislikes.filter(
              dislike => dislike.user.toString() === req.user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notdisliked: "You have not yet disliked this review" });
          }

          //Get remove index
          const removeIndex = ourReview.dislikes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          ourReview.dislikes.splice(removeIndex, 1);

          //Save
          product.save();
          return res.status(404).json(ourReview);
        })
        .catch(err => res.status(404).json({ postnotfound: "post not found" }));
    });
  }
);

// @route  POST api/posts/comment/:id
// @desc   Add comment to post
// @access Private
router.post(
  "/comment/:product_id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Product.findById(req.params.product_id)
      .then(product => {
        var ourReview;
        for (var i = 0; i < product.reviews.length; i++) {
          if (product.reviews[i].id === req.params.review_id) {
            ourReview = product.reviews[i];
          }
        }
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        ourReview.comments.unshift(newComment);

        // Save
        product.save();
        return res.status(404).json(ourReview);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(404).json({ postnotfound: "No post found" });
      });
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Add comment from post
// @access Private
router.delete(
  "/comment/:product_id/:review_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.product_id)
      .then(product => {
        var ourReview;
        for (var i = 0; i < product.reviews.length; i++) {
          if (product.reviews[i].id === req.params.review_id) {
            ourReview = product.reviews[i];
          }
        }
        // Check to see if comment exists
        if (
          ourReview.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "comment does not exist" });
        }

        // Get remove index
        const removeIndex = ourReview.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        ourReview.comments.splice(removeIndex, 1);

        product.save();
        return res.status(404).json(ourReview);
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
