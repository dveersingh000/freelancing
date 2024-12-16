// controllers/profileController.js
const User = require('../models/userModel');

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
  


