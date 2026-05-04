import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },

    phoneNumber: {
      type: Number,
      required: [true, 'Phone number is required'],
    },

    role: {
      type: String,
      enum: ['student', 'recruiter'],
      required: [true, 'Role is required'],
    },

    profile: {
      bio: {
        type: String,
        default: '',
      },

      skills: [
        {
          type: String,
        }
      ],

      resume: {
        type: String,        // Cloudinary URL
        default: '',
      },

      resumeOriginalName: {
        type: String,        // Original file name
        default: '',
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',      // Recruiter ke liye
      },

      profilePhoto: {
        type: String,        // Cloudinary URL
        default: '',
      },
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);