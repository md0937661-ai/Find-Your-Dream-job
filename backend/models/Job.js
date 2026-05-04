import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    

    requirements: [
      {
        type: String,   // ["React", "Node.js", "MongoDB"]
      }
    ],

    salary: {
      type: Number,
      required: [true, 'Salary is required'],
    },

    location: {
      type: String,
      required: [true, 'Location is required'],
    },

    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract', 'Freelance', 'Full-time', 'Part-time'],
      required: [true, 'Job type is required'],
    },

    position: {
      type: Number,       // Kitni vacancies hain
      required: [true, 'Number of positions is required'],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',     // Company ka reference
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // Recruiter jisne job post ki
      required: true,
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',   // Saare applications ka array
      }
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', jobSchema);
export default mongoose.model('Job', jobSchema);