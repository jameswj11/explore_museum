import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import homeRoute from "./backend/routes/home_route.js";
import API_route from "./backend/routes/api_route.js";
import User from "./backend/models/user.js"
import passport from "passport";  
import LocalStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5050;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// connect DB
// mongoose.connect("mongodb://localhost/27017");

// middlewares
app.use(cors());
app.use(express.json());
app.use(session({
  secret: "test user",
  resave: false,
  saveUnitialized: false,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routing
app.use("/", homeRoute);
app.use("/api", API_route);
app.use("/secret", (req, res)=> {
  res.render("./user/secret");
})
app.use("/register", (req, res)=> {
  res.render("./user/register");
})

// handle user signup
// app.get("/register", async (req, res)=> {
//   const user = await User.create({
//     username: req.body.username,
//     password: req.body.password
//   })
//   return res.status(200).json(user);
// })

app.use("/login", (req, res)=> {
  res.render("./user/login");
})

//handle user login
// app.post("/login", async (req, res)=> {
//   try {
//     const user = await User.findOne( {username: req.body.username})
//     if (user) {
//       const result = req.body.password === user.password;
//       if (result) {
//         res.render("./user/secret");
//       } else {
//         res.status(400).json({error: "password doesn't match"})
//       }
//     } else {
//       res.status(400).json({error: "user doesn't exist"})
//     }
//   } catch (error) {
//     res.status(400).json({error})
//   }
// })

//handle user logout
app.get("/logout", (req, res)=> {
  req.logout((err)=> {
    if (err) {
      return next(err);
    }

    res.redirect("/")
  })
})

//public
app.use(express.static(path.join(__dirname, "/frontend")));

//views
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");

// start the express server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("./user/login")
}