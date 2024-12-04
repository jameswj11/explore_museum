import express from "express";
import rijksData from "../models/rijksData.js";
const router = express.Router();
router.get('/data', async (req, res) => {
    console.log('request from frontend:')
    const data = await rijksData.searchArt();
    res.send(data)
    // console.log('data from api_route:', data)
})

export default router;