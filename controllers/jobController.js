const Job = require('../models/Job');
const Employer = require('../models/Employer');

// Search Jobs
exports.searchJobs = async (req, res) => {
  try {
    const { keywords, location } = req.query;
    const jobs = await Job.find({ 
      $text: { $search: keywords }, 
      location 
    });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Job Details
exports.getJobDetails = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id).populate('employer');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Employer Details
exports.getEmployerDetails = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id).populate('employer');
    if (!job || !job.employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.status(200).json({ employer: job.employer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Available Shifts
exports.getAvailableShifts = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const availableShifts = job.shifts.filter(shift => shift.isAvailable);
    res.status(200).json({ shifts: availableShifts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Job Requirements
exports.getJobRequirements = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id, 'requirements');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ requirements: job.requirements });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Job Scope
exports.getJobScope = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id, 'scope');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ scope: job.scope });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Job Timing
exports.getJobTiming = async (req, res) => {
  try {
    const { job_id } = req.query;
    const job = await Job.findById(job_id, 'shifts');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ shifts: job.shifts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Apply for Job
exports.applyForJob = async (req, res) => {
  try {
    const { job_id, user_id } = req.body;
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.applicants.includes(user_id)) {
      return res.status(400).json({ message: 'User already applied' });
    }
    job.applicants.push(user_id);
    await job.save();
    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
