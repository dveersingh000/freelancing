const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require('./routes/jobRoutes'); 
const shiftRoutes = require('./routes/shiftRoutes');
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const employerRoutes = require('./routes/employerRoutes');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/shift", shiftRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/employer', employerRoutes);
app.use(cors());


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