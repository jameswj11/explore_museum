import express from "express";
import rijksData from "../models/rijksData.js";

const router = express.Router();
router.get("/data", async (req, res) => {
  const data = await rijksData.searchArt(req.query);
  res.send(data);
});

export default router;
