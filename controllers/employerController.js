const Employer = require('../models/Employer');
const Job = require('../models/Job');

// Fetch all employers
exports.getEmployers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'name', filter = {} } = req.query;
    const employers = await Employer.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Employer.countDocuments(filter);
    res.status(200).json({ employers, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employers' });
  }
};

// Fetch employer details
exports.getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await Employer.findById(id);
    if (!employer) return res.status(404).json({ message: 'Employer not found' });
    res.status(200).json(employer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employer details' });
  }
};

// Add a new employer
exports.addEmployer = async (req, res) => {
  try {
    const newEmployer = new Employer(req.body);
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (error) {
    res.status(400).json({ message: 'Error adding employer' });
  }
};

// Update employer details
exports.updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployer = await Employer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployer) return res.status(404).json({ message: 'Employer not found' });
    res.status(200).json(updatedEmployer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating employer' });
  }
};

// Delete an employer
exports.deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployer = await Employer.findByIdAndDelete(id);
    if (!deletedEmployer) return res.status(404).json({ message: 'Employer not found' });
    res.status(200).json({ message: 'Employer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employer' });
  }
};

// Fetch jobs posted by an employer
exports.getEmployerJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Job.find({ company: id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employer jobs' });
  }
};

// Add a new job for an employer
exports.addEmployerJob = async (req, res) => {
  try {
    const { id } = req.params; // Employer ID
    const newJob = new Job({ ...req.body, company: id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Error adding job' });
  }
};

// Update job details
exports.updateEmployerJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job' });
  }
};

// Delete a job
exports.deleteEmployerJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting job' });
  }
};

