const Profile = require("../models/Profile");
const User = require("../models/User");
const Job = require("../models/Job");

exports.completeProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { fullName, nricOrFinNumber, dateOfBirth, gender, postalCode, images, extraFields } = req.body;

    const profile = new Profile({ userId, fullName, nricOrFinNumber, dateOfBirth, gender, postalCode, images, extraFields });
    const savedProfile = await profile.save();

    await User.findByIdAndUpdate(userId, { profileCompleted: true, profileId: savedProfile._id });

    res.status(201).json({ message: "Profile completed successfully.", profile: savedProfile });
  } catch (err) {
    res.status(500).json({ error: "Failed to complete profile.", details: err.message });
  }
};


exports.getProfile = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const profile = await Profile.findOne({ userId });
      if (!profile) return res.status(404).json({ error: "Profile not found." });
  
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch profile.", details: err.message });
    }
  };

  exports.updateProfile = async (req, res) => {
    try {
      const userId = req.user.id; 
      const updates = req.body;
  
      const updatedProfile = await Profile.findOneAndUpdate({ userId }, updates, { new: true });
      if (!updatedProfile) return res.status(404).json({ error: "Profile not found." });
  
      res.status(200).json({ message: "Profile updated successfully.", profile: updatedProfile });
    } catch (err) {
      res.status(500).json({ error: "Failed to update profile.", details: err.message });
    }
  };

  exports.getProfileStats = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalCompletedJobs = await Job.countDocuments({ applicants: { $elemMatch: { user: userId } }, status: "Completed" });
      const totalCancelledJobs = await Job.countDocuments({ applicants: { $elemMatch: { user: userId } }, status: "Cancelled" });
      const noShowJobs = 0; // Placeholder for no-show jobs, calculate if applicable
      const totalHoursWorked = await Job.aggregate([
        { $match: { applicants: { $elemMatch: { user: userId } }, status: "Completed" } },
        { $lookup: { from: "shifts", localField: "shifts", foreignField: "_id", as: "shiftDetails" } },
        { $unwind: "$shiftDetails" },
        { $group: { _id: null, totalHours: { $sum: "$shiftDetails.duration" } } },
      ]);
  
      res.status(200).json({
        totalCompletedJobs,
        totalCancelledJobs,
        noShowJobs,
        totalHoursWorked: totalHoursWorked[0]?.totalHours || 0,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch profile stats.", details: err.message });
    }
  };