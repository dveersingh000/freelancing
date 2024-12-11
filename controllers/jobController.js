const Job = require('../models/Job');

exports.searchJobs = async (req, res) => {
  try {
    const { keywords, location } = req.query;
    const jobs = await Job.find({ $text: { $search: keywords }, location });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const { job_id, user_id } = req.body;
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    job.applicants.push(user_id);
    await job.save();
    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.manageJobs = async (req, res) => {
  try {
    const { user_id } = req.query;
    const jobs = await Job.find({ applicants: user_id });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
