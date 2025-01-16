const Job = require('../models/Job');
const Shift = require('../models/Shift');
const  Application = require('../models/Application');

exports.createJob = async (req, res) => {
  try {
    const { jobName, company, outlet, location, industry, date, jobDescription, jobRequirements, status, shifts } = req.body;

    // Create the job
    const job = new Job({
      jobName,
      company,
      // outlet,
      location,
      industry,
      date,
      jobDescription,
      jobRequirements,
      status,
    });

    const savedJob = await job.save();

    // If shifts are provided, create and associate them
    if (shifts && shifts.length > 0) {
      const shiftIds = [];
      for (const shiftData of shifts) {
        const shift = new Shift({ ...shiftData, jobId: savedJob._id });
        const savedShift = await shift.save();
        shiftIds.push(savedShift._id);
      }

      // Update the job document with the shift IDs
      savedJob.shifts = shiftIds;
      await savedJob.save();
    }

    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job', details: err.message });
  }
};

// Fetch jobs with pagination, search, and filters
exports.getJobs = async (req, res) => {
  try {
    const { search, status, location, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    // Add search keyword filter (case-insensitive)
    if (search) {
      filters.jobName = { $regex: search, $options: "i" }; // Search in jobName
    }

    // Add status filter if provided
    if (status) {
      filters.status = status;
    }

    // Add location filter (case-insensitive)
    if (location) {
      filters.location = { $regex: location, $options: "i" };
    }
    
    // Paginate results
    const jobs = await Job.find(filters)
      .populate('shifts')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      // .select('jobName description location dates shifts wages hourlyRate breakTime requirements');

    const totalJobs = await Job.countDocuments(filters);

    res.status(200).json({ 
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      totalJobs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get jobs by id
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate('shifts')
      .populate('applicants')
      .select('jobName description location dates shifts wages hourlyRate breakTime requirements');

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//apply for job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, shift } = req.body;
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    const application = new Application({
      user: userId,
      job: jobId,
      shift,
    });

    await application.save();

    res.status(201).json({ success: true, message: 'Successfully applied for the job.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Retrieve job counts or available shifts for each date.
exports.getJobsByDate = async (req, res) => {
  try {
    const dates = await Job.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          jobCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ dates });
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
    const { shifts, ...jobData } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update job fields
    Object.assign(job, jobData);

    // Process shifts
    if (shifts && Array.isArray(shifts)) {
      const existingShiftIds = shifts.filter((shift) => shift._id).map((shift) => shift._id);

      // Remove deleted shifts
      await Shift.deleteMany({ _id: { $nin: existingShiftIds }, job: jobId });

      // Add or update shifts
      for (const shiftData of shifts) {
        if (shiftData._id) {
          // Update existing shift
          await Shift.findByIdAndUpdate(shiftData._id, shiftData);
        } else {
          // Add new shift
          const newShift = new Shift({ ...shiftData, job: jobId });
          await newShift.save();
          job.shifts.push(newShift._id);
        }
      }

      // Remove any unassociated shift references from the job
      job.shifts = existingShiftIds.concat(
        shifts.filter((shift) => !shift._id).map((shift) => shift._id)
      );
    }

    // Save the job
    const updatedJob = await job.save();

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

//for qr
exports.getUserJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ 'applicants.user': userId });
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user jobs.', details: err.message });
  }
};

exports.getOngoingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Ongoing' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ongoing jobs', details: error.message });
  }
};

exports.getCompletedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Completed' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch completed jobs', details: error.message });
  }
};

exports.getCancelledJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Cancelled' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cancelled jobs', details: error.message });
  }
};
