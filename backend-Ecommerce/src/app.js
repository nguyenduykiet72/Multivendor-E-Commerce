const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const { dbConnect } = require("./utils/db");
require("dotenv").config();

app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000"],
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

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
dbConnect();

module.exports = app
