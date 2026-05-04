// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import cloudinary from '../config/cloudinary.js';

// // ─────────────────────────────────────────
// // @desc    Register New User
// // @route   POST /api/auth/register
// // @access  Public
// // ─────────────────────────────────────────
//   export const register = async (req, res) => {
//   try {
//     const { fullname, email, password, phoneNumber, role } = req.body;

//     // 1. Validation — सभी fields भरी हैं?
//     if (!fullname || !email || !password || !phoneNumber || !role) {
//       return res.status(400).json({
//         message: 'All fields are required',
//         success: false,
//       });
//     }

//     // 2. Email already exist करता है?
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'Email already registered',
//         success: false,
//       });
//     }

//     // 3. Password Hash करो
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 4. User Create करो
//     await User.create({
//       fullname,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       role,
//       profile: {},
//     });

//     return res.status(201).json({
//       message: 'Account created successfully',
//       success: true,
//     });

//   } catch (error) {
//     console.error('Register Error:', error.message);
//     return res.status(500).json({
//       message: 'Server error',
//       success: false,
//     });
//   }
// };


// // ─────────────────────────────────────────
// // @desc    Login User
// // @route   POST /api/auth/login
// // @access  Public
// // ─────────────────────────────────────────
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     // 1. Validation
//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: 'All fields are required',
//         success: false,
//       });
//     }

//     // 2. User exist karta hai?
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: 'Invalid email or password',
//         success: false,
//       });
//     }

//     // 3. Password match karo
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: 'Invalid email or password',
//         success: false,
//       });
//     }

//     // 4. Role match karo
//     if (role !== user.role) {
//       return res.status(400).json({
//         message: 'Account not found with this role',
//         success: false,
//       });
//     }
//     //  console.log("JWT:", process.env.JWT_SECRET);
//     // 5. JWT Token Generate करो
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     // 6. Response के लिए user data clean करो
//     const userData = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     // 7. Cookie में token set करो
//     return res
//       .status(200)
//       .cookie('token', token, {
//         maxAge: 24 * 60 * 60 * 1000,   // 1 day
//         httpOnly: true,                  // XSS attacks से बचाव
//         sameSite: 'strict',              // CSRF attacks से बचाव
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user: userData,
//         success: true,
//       });

//   } catch (error) {
//     console.error('Login Error:', error.message);
//     return res.status(500).json({
//       message: 'Server error',
//       success: false,
//     });
//   }
// };


// // ─────────────────────────────────────────
// // @desc    Logout User
// // @route   GET /api/auth/logout
// // @access  Private
// // ─────────────────────────────────────────
// export const logout = async (req, res) => {
//   try {
//     // Cookie clear करो
//     return res
//       .status(200)
//       .cookie('token', '', { maxAge: 0 })
//       .json({
//         message: 'Logged out successfully',
//         success: true,
//       });

//   } catch (error) {
//     console.error('Logout Error:', error.message);
//     return res.status(500).json({
//       message: 'Server error',
//       success: false,
//     });
//   }
// };


// // ─────────────────────────────────────────
// // @desc    Update Profile
// // @route   PUT /api/auth/profile/update
// // @access  Private
// // ─────────────────────────────────────────
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;

//     // Skills array mein convert karo
//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(',').map((skill) => skill.trim());
//     }

//     const userId = req.user._id;

//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found',
//         success: false,
//       });
//     }

//     // Fields update karo
//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     // ─────────────────────────────────────────
//     // Profile Photo Upload
//     // ─────────────────────────────────────────
//     if (req.files && req.files.profilePhoto) {
//       const photoFile = req.files.profilePhoto[0];
//       user.profile.profilePhoto = photoFile.path;  // Cloudinary URL
//     }

//     // ─────────────────────────────────────────
//     // Resume Upload
//     // ─────────────────────────────────────────
//     if (req.files && req.files.resume) {
//       const resumeFile = req.files.resume[0];
//       user.profile.resume = resumeFile.path;                    // Cloudinary URL
//       user.profile.resumeOriginalName = resumeFile.originalname; // Original name
//     }

//     await user.save();

//     const userData = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: 'Profile updated successfully',
//       user: userData,
//       success: true,
//     });

//   } catch (error) {
//     console.error('Update Profile Error:', error.message);
//     return res.status(500).json({
//       message: 'Server error',
//       success: false,
//     });
//   }
// };


import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

// ─────────────────────────────────────────
// Cloudinary Buffer Upload Helper
// ─────────────────────────────────────────
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
};


// ─────────────────────────────────────────
// @desc    Register
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered',
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {},
    });

    return res.status(201).json({
      message: 'Account created successfully',
      success: true,
    });

  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};


// ─────────────────────────────────────────
// @desc    Login
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: 'Account not found with this role',
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};


// ─────────────────────────────────────────
// @desc    Logout
// @route   GET /api/auth/logout
// @access  Private
// ─────────────────────────────────────────
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie('token', '', { maxAge: 0 })
      .json({
        message: 'Logged out successfully',
        success: true,
      });
  } catch (error) {
    console.error('Logout Error:', error.message);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};


// ─────────────────────────────────────────
// @desc    Update Profile
// @route   PUT /api/auth/profile/update
// @access  Private
// ─────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    console.log('FILES:', req.files);   // ← debug ke liye
    console.log('BODY:', req.body);     // ← debug ke liye

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(',').map((s) => s.trim());
    }

    // Profile Photo
    if (req.files && req.files['profilePhoto']) {
      const photoFile = req.files['profilePhoto'][0];
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'job-portal/profiles',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(photoFile.buffer);
      });
      user.profile.profilePhoto = result.secure_url;
    }

    // Resume
    if (req.files && req.files['resume']) {
      const resumeFile = req.files['resume'][0];
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'job-portal/resumes',
            resource_type: 'raw',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(resumeFile.buffer);
      });
      user.profile.resume = result.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });

  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};