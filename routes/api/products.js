const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    developer: req.body.developer,
    image: req.body.image,
    image2: req.body.image2,
    genre: req.body.genre,
    trailer: req.body.trailer,
    release: req.body.release,
    platforms: req.body.platforms,
    price: req.body.price,
    description: req.body.description
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route  POST api/products/like/:id
// @desc   Like product
// @access Private

router.post(
  "/like/:product_id",
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
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this product" });
          } else if (
            ourReview.dislikes.filter(
              dislike => dislike.user.toString() === req.user.id
            ).length > 0
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

// @route  POST api/products/unlike/:id
// @desc   Like product
// @access Private

router.post(
  "/unlike/:product_id",
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
// @desc   dislike product
// @access Private

router.post(
  "/dislike/:product_id",
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
// @desc   undislike product
// @access Private

router.post(
  "/undislike/:product_id",
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

module.exports = router;
