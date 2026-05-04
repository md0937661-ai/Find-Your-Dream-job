import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',           // Kis job ke liye apply kiya
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',          // Kisne apply kiya (Student)
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',   // Default pending rehta hai
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Application', applicationSchema);



export default mongoose.model('Application', applicationSchema);