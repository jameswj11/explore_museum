'use strict';
import express from "express";
import rijksData from "../models/rijksData.js";

const router = express.Router();
router.get('/', async (req, res) => {
    res.send(await rijksData.searchArt())
})

export default router;