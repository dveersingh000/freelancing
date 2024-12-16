const Shift = require('../models/Shift');

exports.checkAvailability = async (req, res) => {
  try {
    const { job_id } = req.query;
    const shifts = await Shift.find({ jobId: job_id });
    res.status(200).json({ shifts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getShiftDetails = async (req, res) => {
  try {
    const { shift_id } = req.query;
    const shift = await Shift.findById(shift_id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json({ shift });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
