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
const workerRoutes = require('./routes/workerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const walletRoutes = require('./routes/walletRoutes');
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

const qrRoutes = require('./routes/qrRoutes');
const requirementRoutes = require('./routes/requirementRoutes');
const penaltyRoutes = require('./routes/penaltyRoutes');
const outletRoutes = require('./routes/outletRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cancellationRoutes = require('./routes/cancellationRoutes');
const cors = require("cors");

const app = express();
app.use('/static', express.static('public'));
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/shifts", shiftRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/ewallet', ewalletRoutes);
app.use('/api/employer', employerRoutes);
=======
app.use('/api/wallet', walletRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/penalties', penaltyRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cancellation', cancellationRoutes);
app.use(cors());

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Handle preflight requests
app.options('*', cors());


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
