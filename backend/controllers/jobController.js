import Job from '../models/Job.js';
import Application from '../models/application.js'; // ← ADD THIS



// ─────────────────────────────────────────
// @desc    Post New Job
// @route   POST /api/job/post
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(',').map((r) => r.trim()),
      salary: Number(salary),
      location,
      jobType,
      position, // 👈 string
      company: companyId,
      created_by: req.user._id,
    });

    return res.status(201).json({
      message: 'Job posted successfully',
      job,
      success: true,
    });

  } catch (error) {
    console.error('Post Job Error:', error.message);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get All Jobs (Student ke liye)
// @route   GET /api/job/get
// @access  Private
// ─────────────────────────────────────────
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';

    // Search filter — title ya description mein keyword dhundo
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };

    const jobs = await Job.find(query)
      .populate('company')        // Company details
      .sort({ createdAt: -1 });   // Latest jobs pehle

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error('Get All Jobs Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get Job By ID
// @route   GET /api/job/get/:id
// @access  Private
// ─────────────────────────────────────────


export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate('company')
      .populate('applications');

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.error('Get Job By ID Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get Jobs Posted By Recruiter
// @route   GET /api/job/getadminjobs
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const getAdminJobs = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // Sirf us recruiter ki jobs
    const jobs = await Job.find({ created_by: recruiterId })
      .populate('company')
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error('Get Admin Jobs Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Delete Job
// @route   DELETE /api/job/delete/:id
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Job deleted successfully',
      success: true,
    });

  } catch (error) {
    console.error('Delete Job Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};