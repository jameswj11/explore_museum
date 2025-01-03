import express from "express";

const router = express.Router();
let auth = false;

router.use((req, res, next)=> {
  req.isAuthenticated() ? auth = true : auth = false;
  next();
})

router.get("/", (req, res) => {
  res.render("./main/main", {user: auth});
});

export default router;
