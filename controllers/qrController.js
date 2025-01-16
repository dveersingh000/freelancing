const Job = require('../models/Job');
const Shift = require('../models/Shift');
const Attendance = require('../models/Attendance');
const haversine = require('haversine-distance');

exports.scanQRCode = async (req, res) => {
  try {
    const { qrCodeData, userLatitude, userLongitude, action, shiftId } = req.body;

    // Decode the QR Code (Assuming it contains the jobId)
    const { jobId } = JSON.parse(qrCodeData);

    // Validate the job
    const job = await Job.findById(jobId).populate('shifts');
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Perform geofencing validation
    const [jobLatitude, jobLongitude] = job.location.split(',').map(Number);
    const jobCoordinates = { latitude: jobLatitude, longitude: jobLongitude };
    const userCoordinates = { latitude: userLatitude, longitude: userLongitude };

    const distance = haversine(jobCoordinates, userCoordinates);
    const geofenceLimit = 1000; // meters

    if (distance > geofenceLimit) {
      return res.status(400).json({ message: 'You are outside the allowed area.' });
    }

    // Check if the selected shift is valid
    const shift = await Shift.findById(shiftId);
    if (!shift || String(shift.job) !== String(jobId)) {
      return res.status(404).json({ message: 'Shift not found or does not belong to the selected job.' });
    }

    // Log attendance (Clock In/Out)
    const attendance = new Attendance({
      userId: req.user.id,
      jobId: jobId,
      shiftId: shiftId,
      action: action, // clock_in or clock_out
      timestamp: new Date(),
    });

    await attendance.save();

    res.status(200).json({
      message: `Successfully ${action}.`,
      attendance,
      job: {
        jobName: job.jobName,
        company: job.company,
        outlet: job.outlet,
        shiftDetails: shift,
      },
    });
  } catch (error) {
    console.error('Error scanning QR Code:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
