const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const { dbConnect } = require("./utils/db");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/dashboard/categoryRoutes");
const productRoutes = require("./routes/dashboard/productRoutes");
const sellerRoutes = require("./routes/dashboard/sellerRoutes");
const homeRoutes = require('./routes/home/homeRoutes')

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
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sellerRoutes);
app.use("/api", homeRoutes);
dbConnect();

module.exports = app;
