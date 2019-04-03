const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const fs = require("fs");
const onHeaders = require("on-headers");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // accept a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  }
  // reject a file
  else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // Max filesize is 10mbs
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});
// load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// load profile model
const Profile = require("../../models/Profile");
// load user model
const User = require("../../models/User");
// load product model
const Product = require("../../models/product");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public

router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);

// @route  POST api/profile
// @desc   Create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("profileImage"),
  (req, res) => {
    const errors = {};
    const profileFields = {};

    if (req.body.profileImage.length > 0) {
      function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error("Invalid input string");
        }

        response.type = matches[1];
        response.data = new Buffer.from(matches[2], "base64");

        return response;
      }

      var imageBuffer = decodeBase64Image(req.body.profileImage);
      var imageName = "./uploads/" + Date.now() + req.user.name + ".jpg";
      console.log("this is imagename", imageName);
      fs.writeFileSync(imageName, imageBuffer.data, function(err) {});
      var toBeSaved = imageName
        .split(".")
        .slice(1)
        .join(".");
      profileFields.profileImage = toBeSaved;
    }
    //Get fields
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    // if (typeof req.file !== "undefined") {
    //   profileFields.profileImage = req.file.path;
    // }

    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.balance) profileFields.balance = req.body.balance;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // skills split into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    console.log("this is in profilefields", profileFields.profileImage);
    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //Update user avatar
    User.findOne({ _id: req.user.id }).then(user => {
      if (profileFields.profileImage) {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: { avatar: profileFields.profileImage } },
          { new: true },
          (err, doc) => {
            console.log(doc);
          }
        );
      }
    });

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          // if (profile) {
          //   errors.handle = "That handle already exists";
          //   res.status(400).json(errors);
          // }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "there are no profiles" });
    });
});

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route  GET api/profile
// @desc   get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to exp array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route  POST api/profile/education
// @desc   Add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to exp array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        if (removeIndex > -1) {
          profile.experience.splice(removeIndex, 1);
        } else if (removeIndex === -1) {
          return res.status(404).json({ error: "Experience not found" });
        }

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/profile/experience/:edu_id
// @desc   Delete education from profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        if (removeIndex > -1) {
          profile.education.splice(removeIndex, 1);
        } else if (removeIndex === -1) {
          return res.status(404).json({ error: "Education not found" });
        }
        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/profile
// @desc   Delete user and profile
// @access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route  POST api/profile/product/productid
// @desc   Add cart item to profile
// @access Private
router.post(
  "/product/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Product.findById(req.params.product_id).then(product => {
          const newItem = {
            item: req.params.product_id,
            price: product.price,
            image: product.image,
            name: product.name,
            publisher: product.developer,
            platform: product.platforms,
            cdkey: product.cdkey
          };
          //Add to exp array
          profile.cart.unshift(newItem);
          profile.save().then(profile => res.json(profile));
        });
      })
      .catch(err =>
        res
          .status(404)
          .json({ profilenotfound: "please set up user profile first" })
      );
  }
);

// @route  DELETE api/profile/product/productid
// @desc   Delete item from profile cart
// @access Private
router.delete(
  "/product/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Product.findById(req.params.product_id).then(product => {
          var ourProduct;
          for (var i = 0; i < profile.cart.length; i++) {
            if (profile.cart[i].item === req.params.product_id) {
              ourProduct = profile.cart[i];
              if (ourProduct.item === req.params.product_id) {
                profile.cart.splice(i, 1);
              }
              break;
            }
          }
          if (ourProduct === undefined) {
            return res.status(404).json({ error: "cart item not found" });
          }
          //save
          profile.save().then(profile => res.json(profile));
        });
      })
      .catch(err => {
        console.log(err.stack);
        res.status(404).json(err);
      });
  }
);

// @route  GET api/profile/products
// @desc   Add cart item to profile
// @access Private
router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.product_id).then(product => {
        return res.json(profile.cart);
      });
    });
  }
);

// @route  POST api/profile/customersupport
// @desc   send inbox message to admin
// @access Private
router.post(
  "/customersupport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(profile => {
      User.findOne({ isAdmin: true }).then(user => {
        const newMessage = {
          user: req.user.id,
          name: req.user.name,
          image: req.user.avatar,
          msg: req.body.msg
        };

        if (newMessage.msg.length < 5) {
          return res.status(400).json({
            messageisrequired: "message should be at least 5 letters long"
          });
        }
        //Add to inbox array
        user.inbox.unshift(newMessage);
        user.save().then(user => res.json(newMessage));
      });
    });
  }
);

// @route  POST api/profile/customersupport
// @desc   send inbox message to admin
// @access Private
router.post(
  "/privatemessage/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("hello");
    User.findOne({ _id: req.user.id }).then(profile => {
      User.findOne({ _id: req.params.user_id }).then(user => {
        if (req.user.id === req.params.user_id) {
          return res.status(400).json({
            messageerror: "You can't message yourself"
          });
        }
        const newMessage = {
          user: req.user.id,
          name: req.user.name,
          image: req.user.avatar,
          msg: req.body.msg
        };
        console.log;
        //Add to inbox array
        if (newMessage.msg.length < 5) {
          return res.status(400).json({
            messageisrequired: "message should be at least 5 letters long"
          });
        }
        user.inbox.unshift(newMessage);
        user.save().then(user => res.json(newMessage));
      });
    });
  }
);

// @route  GET api/profile/customersupport
// @desc   get your messages
// @access Private
router.get(
  "/privatemessage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
      if (user.inbox.length > 0) {
        res.status(200).json(user.inbox);
      } else {
        return res
          .status(400)
          .json({ nomessages: "There are no private messages for you" });
      }
    });
  }
);

// @route  POST api/profile/changename/user_id
// @desc   Create or edit user profile
// @access Private
router.post(
  "/changename/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.name.length < 4) {
      res.json({ nameerror: "new name must be at least 4 characters long" });
    }
    User.findOne({ _id: req.user.id }).then(user => {
      if (user.isAdmin === true) {
        User.findOne({ _id: req.params.user_id }).then(user2 => {
          user2.name = req.body.name;
          user2.save().then(user => res.json(user));
        });
      } else {
        return res.status(404).json({ notadmin: "user is not admin" });
      }
    });
  }
);

// @route  POST api/profile/purchases
// @desc   Add cart item to profile
// @access Private
router.post(
  "/purchases",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile.cart.length > 0) {
        let newPurchases = [];
        profile.cart.map(product => {
          let removeIndex = 0;
          newPurchases.unshift(product);
          removeIndex++;
        });
        profile.cart = [];
        profile.purchases.unshift(newPurchases);
        profile.save().then(profile => res.json(profile));
      } else {
        return res
          .status(404)
          .json({ noitems: "sorry you have no items on cart to buy" });
      }
    });
  }
);

// @route  GET api/profile/purchases
// @desc   Add cart item to profile
// @access Private
router.get(
  "/purchases",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile.purchases.length > 0) {
        return res.status(200).json(profile.purchases);
      } else {
        return res
          .status(404)
          .json({ noitems: "sorry you have bought no items" });
      }
    });
  }
);

module.exports = router;
