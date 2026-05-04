import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },

    location: {
      type: String,
      required: [true, 'Company location is required'],
    },

    logo: {
      type: String,       // Cloudinary URL
      default: '',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // Recruiter jisne company register ki
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Company', companySchema);
export default mongoose.model('Company', companySchema);