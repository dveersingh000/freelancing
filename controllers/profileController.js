// const Profile = require('../models/Profile.js');
const User = require('../models/userModel');
// const School = require('../models/schoolModel'); 

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.uploadNricImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.nricImages = {
      front: req.files['nricFront'][0].path,
      back: req.files['nricBack'][0].path
    };
    await user.save();
    res.status(200).json({ message: 'NRIC Images Uploaded Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.uploadPlocImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.plocImage = req.file.path;
    await user.save();
    res.status(200).json({ message: 'PLOC Image Uploaded Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updatePlocExpiryDate = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.plocExpiryDate = req.body.expiryDate;
    await user.save();
    res.status(200).json({ message: 'PLOC Expiry Date Updated Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.uploadFoodHygieneCert = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.foodHygieneCert = req.file.path;
    await user.save();
    res.status(200).json({ message: 'Food Hygiene Certificate Uploaded Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.uploadStudentPassImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.studentPassImage = req.file.path;
    await user.save();
    res.status(200).json({ message: 'Student Pass Image Uploaded Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.fetchSchoolsList = async (req, res) => {
  try {
    const schools = await School.find(); // Replace with actual data retrieval
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.submitForApproval = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isProfileApproved = true;
    await user.save();
    res.status(200).json({ message: 'Profile Submitted for Approval' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};