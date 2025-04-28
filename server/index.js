require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");
const memberRouter = require("./router/member");
const gateRouter = require("./router/gate");
const activityRouter = require("./router/activity");
const serviceImageRouter = require("./router/serviceImage");

//connect to database
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://throneroom-international.onrender.com",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/member", memberRouter);
app.use("/api/gate", gateRouter);
app.use("/api/activity", activityRouter);
app.use("/api/serviceImage", serviceImageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
