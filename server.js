import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import homeRoute from "./backend/routes/home_route.js";
import API_route from "./backend/routes/api_route.js";
import userRoute from "./backend/routes/user_route.js"
import User from "./backend/models/user.js";
import passport from "passport";  
import LocalStrategy from "passport-local";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5050;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// connect DB
mongoose.connect("mongodb://localhost/exploreRijksmuseum");

// middlewares
app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "testUser",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// routing
app.use("/", homeRoute);
app.use("/api", API_route);
app.use("/user", userRoute);

//public
app.use(express.static(path.join(__dirname, "/frontend")));

//views
app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");

// start the express server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});