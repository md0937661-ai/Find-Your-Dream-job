// const Company = require('../models/Company');
import Company from '../models/Company.js';


// ─────────────────────────────────────────
// @desc    Register New Company
// @route   POST /api/company/register
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
 export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // 1. Validation
    if (!name || !location) {
      return res.status(400).json({
        message: 'Company name and location are required',
        success: false,
      });
    }

    // 2. Company already exist karti hai?
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: 'Company with this name already exists',
        success: false,
      });
    }

    // 3. Company create karo
    company = await Company.create({
      name,
      description,
      website,
      location,
      userId: req.user._id,   // authMiddleware se aayega
    });

    return res.status(201).json({
      message: 'Company registered successfully',
      company,
      success: true,
    });

  } catch (error) {
    console.error('Register Company Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get All Companies (Recruiter ki)
// @route   GET /api/company/get
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const getCompany = async (req, res) => {
  try {
    const userId = req.user._id;

    // Sirf us recruiter ki companies
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: 'No companies found',
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });

  } catch (error) {
    console.error('Get Company Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get Company By ID
// @route   GET /api/company/get/:id
// @access  Private
// ─────────────────────────────────────────
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });

  } catch (error) {
    console.error('Get Company By ID Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Update Company
// @route   PUT /api/company/update/:id
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
// ─────────────────────────────────────────
// @desc    Update Company (With Logo Upload)
// @route   PUT /api/company/update/:id
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
import { v2 as cloudinary } from 'cloudinary';

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    console.log('FILE:', req.file);    // debug
    console.log('BODY:', req.body);    // debug

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    // ─────────────────────────────────────────
    // Logo Upload — Cloudinary
    // ─────────────────────────────────────────
    if (req.file) {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return res.status(500).json({
          message: 'Cloudinary credentials missing in .env. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
          success: false,
        });
      }
      try {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'job-portal/logos',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        updateData.logo = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary Logo Upload Error:', uploadError.message || uploadError);
        return res.status(500).json({
          message: `Logo upload failed: ${uploadError.message || 'Cloudinary error'}`,
          success: false,
        });
      }
    }

    // const company = await Company.findByIdAndUpdate(
    //   req.params.id,
    //   updateData,
    //   { new: true }
    // );

    const company = await Company.findByIdAndUpdate(
     req.params.id,
     updateData,
     { returnDocument: 'after' }
     );


    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Company updated successfully',
      company,
      success: true,
    });

  } catch (error) {
    console.error('Update Company Error:', error.message);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// ─────────────────────────────────────────
// @desc    Get All Companies (Public)
// @route   GET /api/company/all
// @access  Public
// ─────────────────────────────────────────
export const getAllCompanies = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const query = {
      name: { $regex: keyword, $options: 'i' },
    };

    const companies = await Company.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error('Get All Companies Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};
