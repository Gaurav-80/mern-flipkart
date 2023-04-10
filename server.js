import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { v4 as uuid } from "uuid";
import connectDB from "./database/db.js";
import DefaultData from "./default.js";
import Routes from "./routes/route.js";
import path from "path";
import {fileURLToPath} from 'url';

dotenv.config();
const app = express();

// mongodb connection
connectDB();

//esmodule fix
const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename)

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./client/build")));

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Port
const PORT = process.env.PORT || 8000;

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});

DefaultData();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Routes);
