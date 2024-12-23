// routes/profileRoutes.js
const express = require('express');
const multer = require('multer');
const { 
  getProfile, updateProfile, uploadNricImage, uploadPlocImage, updatePlocExpiryDate,
  uploadFoodHygieneCert, uploadStudentPassImage, fetchSchoolsList, submitForApproval
} = require('../controllers/profileController');
const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/upload-nric', upload.fields([
  { name: 'nricFront', maxCount: 1 },
  { name: 'nricBack', maxCount: 1 }
]), uploadNricImage);
router.post('/upload-ploc', upload.single('plocImage'), uploadPlocImage);
router.post('/ploc-expiry-date', updatePlocExpiryDate);
router.post('/upload-food-hygiene', upload.single('certImage'), uploadFoodHygieneCert);
router.post('/upload-student-pass', upload.single('passImage'), uploadStudentPassImage);
router.get('/schools', fetchSchoolsList);
router.post('/submit-approval', submitForApproval);

module.exports = router;