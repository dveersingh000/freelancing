// routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/upload-nric', upload.fields([
  { name: 'nricFront', maxCount: 1 },
  { name: 'nricBack', maxCount: 1 }
]), uploadNricImage);


module.exports = router;