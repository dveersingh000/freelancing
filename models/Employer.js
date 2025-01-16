const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: false },
    contactPerson: { type: String, required: true },
    jobPosition: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    companyNumber: { type: String, required: true },
    industry: { type: String, required: true },
    accountManager: { type: String, required: true },
    outlets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' }],
    contractStartDate: { type: Date, required: true },
    contractEndDate: { type: Date, required: true },
    serviceAgreement: { 
      type: String, 
      enum: ['In Discussion', 'Completed', 'Expired'], 
      required: true 
    },
    active: { type: Boolean, default: true },
    jobPostingLimit: { type: Number, default: 50 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employer', employerSchema);
