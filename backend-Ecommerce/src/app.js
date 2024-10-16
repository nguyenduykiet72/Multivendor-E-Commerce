const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const { dbConnect } = require("./utils/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/dashboard/categoryRoutes");
const productRoutes = require("./routes/dashboard/productRoutes");
const sellerRoutes = require("./routes/dashboard/sellerRoutes");
const homeRoutes = require("./routes/home/homeRoutes");
const customerRoutes = require("./routes/home/customerAuthRoutes");
const cartRoutes = require("./routes/home/cartRoutes");
const orderRoutes = require("./routes/order/orderRoute");
const chatRoutes = require("./routes/chatRoutes");

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
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sellerRoutes);
app.use("/api", homeRoutes);
app.use("/api", customerRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", chatRoutes);
dbConnect();

module.exports = app;
