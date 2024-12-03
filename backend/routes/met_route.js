'use strict';
import express from "express";
import metData from "../models/metData.js";

const router = express.Router();
router.get('/', async (req, res) => {
    res.send(await metData.searchArt())
})

export default router;