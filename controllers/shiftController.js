const Job = require("../models/Job");
const Shift = require("../models/Shift");

exports.addShiftToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const shiftData = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const shift = new Shift({ ...shiftData, job: jobId });
    const savedShift = await shift.save();

    // Update the job document to include the shift
    job.shifts.push(savedShift._id);
    await job.save();

    res.status(201).json(savedShift);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add shift" });
  }
};

exports.getShiftsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const shifts = await Shift.find({ job: jobId });
    if (!shifts.length) {
      return res.status(404).json({ error: "No shifts found for this job" });
    }

    res.status(200).json(shifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch shifts" });
  }
};






// // controllers/shiftController.js
// const Shift = require('../models/Shift');
// const ShiftApplication = require('../models/ShiftApplication');
// const Penalty = require('../models/Penalty');

// exports.getJobDetails = async (req, res) => {
//   try {
//     const job = await Job.findById(req.query.job_id);
//     res.status(200).json(job);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getAvailableShifts = async (req, res) => {
//   try {
//     const shifts = await Shift.find({ job_id: req.query.job_id });
//     res.status(200).json(shifts);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.applyForShift = async (req, res) => {
//   try {
//     const { job_id, user_id, shift_id } = req.body;
//     const application = new ShiftApplication({ job_id, user_id, shift_id });
//     await application.save();
//     res.status(200).json({ message: 'Application successful' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getPenaltyInfo = async (req, res) => {
//   try {
//     const penalties = await Penalty.find({ user_id: req.query.user_id });
//     res.status(200).json(penalties);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.processPayment = async (req, res) => {
//   try {
//     const { job_id, user_id, amount } = req.body;
//     const payment = new Payment({ job_id, user_id, amount });
//     await payment.save();
//     res.status(200).json({ message: 'Payment successful' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getTermsAndConditions = async (req, res) => {
//   try {
//     const terms = "Here are the terms and conditions...";
//     res.status(200).json(terms);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getProfileStatus = async (req, res) => {
//   try {
//     const user = await User.findById(req.query.user_id);
//     const isComplete = user.name && user.email && user.profilePicture;
//     res.status(200).json({ profileComplete: !!isComplete });
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getShiftBookingStatus = async (req, res) => {
//   try {
//     const bookingStatus = await ShiftApplication.findOne({
//       job_id: req.query.job_id,
//       shift_id: req.query.shift_id
//     });
//     res.status(200).json(bookingStatus);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getJobCancellationPolicy = async (req, res) => {
//   try {
//     const policy = "Here is the cancellation policy...";
//     res.status(200).json(policy);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getOngoingShifts = async (req, res) => {
//   try {
//     const shifts = await Shift.find({ user_id: req.query.user_id, status: 'ongoing' });
//     res.status(200).json(shifts);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getCompletedShifts = async (req, res) => {
//   try {
//     const shifts = await Shift.find({ user_id: req.query.user_id, status: 'completed' });
//     res.status(200).json(shifts);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getCanceledShifts = async (req, res) => {
//   try {
//     const shifts = await Shift.find({ user_id: req.query.user_id, status: 'canceled' });
//     res.status(200).json(shifts);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };
