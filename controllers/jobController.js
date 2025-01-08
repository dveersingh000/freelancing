const Job = require('../models/Job');
const Shift = require('../models/Shift');

exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Fetch jobs with pagination, search, and filters
exports.getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, city, shiftsMin, shiftsMax } = req.query;
    
    const filters = {};
    if (search) filters.jobName = { $regex: search, $options: 'i' };
    if (status) filters.status = status;
    if (city) filters.location = { $regex: city, $options: 'i' };
    

    const jobs = await Job.find(filters)
      .populate({
        path: 'shifts',
        match: {
          $expr: {
            $and: [
              { $gte: [{ $size: "$shifts" }, Number(shiftsMin || 0)] },
              { $lte: [{ $size: "$shifts" }, Number(shiftsMax || Infinity)] },
            ],
          },
        },
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filters);

    res.status(200).json({ 
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update job details
exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Filters
exports.getFilters = async (req, res) => {
  try {
    const statuses = await Job.distinct('status');
    const cities = await Job.distinct('location');
    const numberOfShifts = await Shift.aggregate([
      { $group: { _id: "$job", count: { $sum: 1 } } },
      { $group: { _id: null, min: { $min: "$count" }, max: { $max: "$count" } } },
    ]);
    res.status(200).json({ 
      statuses, 
      cities,
      shiftsRange: numberOfShifts.length
        ? { min: numberOfShifts[0].min, max: numberOfShifts[0].max }
        : { min: 0, max: 0 },
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get Dashboard Metrics
exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalActiveJobs = await Job.countDocuments({ status: 'Active' });
    const totalUpcomingJobs = await Job.countDocuments({ status: 'Pending' });
    const totalCancelledJobs = await Job.countDocuments({ status: 'Cancelled' });

    const totalShifts = await Shift.countDocuments();
    const totalVacancies = await Shift.aggregate([{ $group: { _id: null, total: { $sum: "$vacancy" } } }]);

    const attendanceRate = totalShifts
      ? Math.round((totalVacancies[0]?.total ?? 0) / totalShifts * 100)
      : 0;

    res.status(200).json({
      totalActiveJobs,
      totalUpcomingJobs,
      totalCancelledJobs,
      attendanceRate,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics', details: err.message });
  }
};

// View Job Details
exports.viewJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('shifts');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job details', details: err.message });
  }
};

// Modify Job
exports.modifyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to modify job', details: err.message });
  }
};

// Duplicate Job
exports.duplicateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('shifts');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const newJob = new Job({
      ...job._doc,
      _id: undefined,
      shifts: job.shifts.map((shift) => ({ ...shift, _id: undefined })),
    });
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to duplicate job', details: err.message });
  }
};

// Deactivate Job
exports.deactivateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deactivatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status: 'Deactivated' },
      { new: true }
    );
    if (!deactivatedJob) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json(deactivatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to deactivate job', details: err.message });
  }
};

// Cancel Job
exports.cancelJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    // First update the job's status to Cancelled
    const cancelledJob = await Job.findByIdAndUpdate(
      jobId,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!cancelledJob) return res.status(404).json({ error: 'Job not found' });

    // Now delete the job from the database
    await Job.findByIdAndDelete(jobId);

    res.status(200).json(cancelledJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel job', details: err.message });
  }
};
