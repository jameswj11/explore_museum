import 'dotenv/config';
import express from "express";
import cors from "cors";
import {dirname} from 'path';
import path from 'path';
import {fileURLToPath} from 'url'
import homeRoute from "./backend/routes/home_route.js";
import rijksRoute from './backend/routes/rijksData.js';

const PORT = process.env.PORT || 5050;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middlewares
app.use(cors());
app.use(express.json());

// routing
app.use("/", homeRoute);
app.use("/rijks", rijksRoute);

//public
app.use(express.static(path.join(__dirname, '/frontend/public')))

//views
app.set('views', path.join(__dirname, 'frontend/views'))
app.set('view engine', 'ejs')

// start the express server
app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`);
});