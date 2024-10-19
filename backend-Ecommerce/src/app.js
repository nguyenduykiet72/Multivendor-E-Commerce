const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const { dbConnect } = require("./utils/db");
require("dotenv").config();


const router = require('./routes/index');

app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/",router);


dbConnect();

module.exports = app;
