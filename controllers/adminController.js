const User = require('../models/userModel');
const Job = require('../models/Job.js');

exports.getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getJobPostingStats = async (req, res) => {
  const { month } = req.query;
  try {
    const jobs = await Job.find({ month });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// More admin controllers as needed
