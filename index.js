const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require('./routes/jobRoutes'); 
const shiftRoutes = require('./routes/shiftRoutes');
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ewalletRoutes = require('./routes/ewalletRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const employerRoutes = require('./routes/employerRoutes');

const app = express();

// CORS Middleware - Applied globally before other routes
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // Allow cookies with requests
}));

app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/shift", shiftRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ewallet', ewalletRoutes);
app.use('/api/employer', employerRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGOOSE_URI_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after successful DB connection
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
