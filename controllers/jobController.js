// controllers/jobController.js
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');

exports.getOngoingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user_id: req.query.user_id, status: 'ongoing' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getCompletedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user_id: req.query.user_id, status: 'completed' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getCancelledJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user_id: req.query.user_id, status: 'cancelled' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.query.job_id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.cancelJob = async (req, res) => {
  try {
    const { job_id, user_id, reason } = req.body;
    await JobApplication.updateOne({ job_id, user_id }, { status: 'cancelled', reason });
    res.status(200).json({ message: 'Job cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
