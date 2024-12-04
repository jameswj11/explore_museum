import 'dotenv/config';
import express from "express";
import cors from "cors";
import homeRoute from "./backend/routes/home_route.js";
import rijksRoute from './backend/routes/rijksData.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

//routing
app.use("/", homeRoute);
app.use("/rijks", rijksRoute);

// start the express server
app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`);
});