const express = require('express');
const {
  getCandidates,
  getCandidateById,
  addOrUpdateCandidate,
  deleteCandidate,
  updateWorkPassStatus,
} = require('../controllers/candidateController');

const router = express.Router();

router.get('/', getCandidates);
router.get('/:id', getCandidateById);
router.post('/', addOrUpdateCandidate);
router.put('/:id', addOrUpdateCandidate);
router.delete('/:id', deleteCandidate);
router.patch('/:id/work-pass-status', updateWorkPassStatus);

module.exports = router;
