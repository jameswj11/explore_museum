import express from "express";
import cors from "cors";
import homeRoute from "../routes/home_route.js";
import metRoute from '../routes/met_route.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

//routing
app.use("/", homeRoute);
app.use("/met", metRoute);

// start the express server
app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`);
});
