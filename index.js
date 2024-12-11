const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(process.env.MONGOOSE_URI_STRING, {})
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
});