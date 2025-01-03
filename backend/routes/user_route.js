import express from "express";
import User from "../models/user.js";
import {saveArt, deleteArt} from "../models/save.js";
import passport from "passport";
// import passport from "passport";

const router = express.Router();
let currentUser;

// check user auth
router.get("/", (req, res)=>{
  res.send(currentUser);
})

// show signup page
router.get("/register", (req, res) => {
  res.render("./user/register");
});

// handle user signup
router.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });
  res.redirect('./login');
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
      currentUser = req.body.username;
      if (result) {
        req.login(user, function(err) {
          if (err) { 
            return next(err); 
          }
          currentUser = req.user;
          res.redirect('/');
        });
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

// handle user logout
router.get("/logout", (req, res)=> {
  req.logout(function(err) {
    if (err) return next(err);
    currentUser = '';
    res.redirect('../../');
  });
});

// handle saving favorites
router.post("/save", (req, res)=>{
  if (req.isAuthenticated()) {
    saveArt(req, res, currentUser);
    res.send({user: true})
  } else {
    res.send({user: false})
  }
});

// handle deleting favorites
router.post("/delete", async (req, res)=> {
  await deleteArt(req, res, currentUser);
})

// render collection page
router.get("/collection", (req, res)=>{
  res.render("./user/collection")
})

export default router;
