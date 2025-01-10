const Candidate = require('../models/Candidate');

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const { status, city, minJobs, maxJobs, minRate, maxRate, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (city) filter.city = city;
    if (minJobs || maxJobs) filter['jobHistory.totalJobs'] = { $gte: minJobs || 0, $lte: maxJobs || Infinity };
    if (minRate || maxRate) filter.avgAttendanceRate = { $gte: minRate || 0, $lte: maxRate || 100 };

    const candidates = await Candidate.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Candidate.countDocuments(filter);

    res.status(200).json({ candidates, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error });
  }
};

// Get candidate profile by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate('jobHistory.job');
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidate profile', error });
  }
};

// Add/Edit candidate
exports.addOrUpdateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = id
      ? await Candidate.findByIdAndUpdate(id, req.body, { new: true })
      : new Candidate(req.body);

    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error saving candidate', error });
  }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndUpdate(id, { status: 'Inactive' }, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting candidate', error });
  }
};

// Update work pass status
exports.updateWorkPassStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error updating work pass status', error });
  }
};
