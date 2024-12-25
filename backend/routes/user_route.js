import express from "express";
import User from "../models/user.js"

const router = express.Router();

// show signup page
router.get("/register", (req, res) => {
  res.render("./user/register");
});

// handle user signup
router.post("/register", async (req, res) => {
  console.log("data:", req.body);
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });
  res.redirect('../../');
});

// show login
router.get("/login", (req, res)=> {
  res.render("./user/login");
});

// handle user login
router.post("/login", async (req, res)=> {
  try {
    const user = await User.findOne( {username: req.body.username})
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        res.render("./user/secret");
      } else {
        res.status(400).json({error: "password doesn't match"});
      }
    } else {
      res.status(400).json({error: "user doesn't exist"});
    }
  } catch (error) {
    res.status(400).json({error});
  };
});

// successful login
router.get("/secret", isLoggedIn, (req, res)=> {
  res.render("secret");
});

// handle user logout
router.get("/logout", (req, res)=> {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('../../');
  });
});

// check if logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("./user/login");
};

export default router;
