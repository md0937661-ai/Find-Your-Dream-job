import Application from '../models/application.js';
import Job from '../models/Job.js';

// ─────────────────────────────────────────
// @desc    Apply For Job
// @route   POST /api/application/apply/:id
// @access  Private (Student only)
// ─────────────────────────────────────────
export const applyJob = async (req, res) => {
  try {
    const studentId = req.user._id;
    const jobId = req.params.id;

    // 1. Job ID valid hai?
    if (!jobId) {
      return res.status(400).json({
        message: 'Job ID is required',
        success: false,
      });
    }

    // 2. Already apply kiya hai?
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: studentId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job',
        success: false,
      });
    }

    // 3. Job exist karti hai?
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    // 4. Application create karo
    const application = await Application.create({
      job: jobId,
      applicant: studentId,
    });

    // 5. Job ke applications array mein push karo
    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: 'Job applied successfully',
      application,
      success: true,
    });

  } catch (error) {
    console.error('Apply Job Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get Applied Jobs (Student ke liye)
// @route   GET /api/application/get
// @access  Private (Student only)
// ─────────────────────────────────────────
export const getAppliedJobs = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Student ki saari applications
    const applications = await Application.find({ applicant: studentId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',    // Job ke saath Company bhi populate karo
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: 'No applications found',
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });

  } catch (error) {
    console.error('Get Applied Jobs Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Get Applicants For Job (Recruiter ke liye)
// @route   GET /api/application/:id/applicants
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Us job ke saare applicants
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',    // Applicant ki details
      },
    });

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
    console.error('Get Applicants Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


// ─────────────────────────────────────────
// @desc    Update Application Status
// @route   PUT /api/application/status/:id/update
// @access  Private (Recruiter only)
// ─────────────────────────────────────────
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // 1. Status valid hai?
    if (!status) {
      return res.status(400).json({
        message: 'Status is required',
        success: false,
      });
    }

    // 2. Valid status values check karo
    const validStatus = ['pending', 'accepted', 'rejected'];
    if (!validStatus.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: 'Invalid status value',
        success: false,
      });
    }

    // 3. Application find karo
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
        success: false,
      });
    }

    // 4. Status update karo
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: 'Application status updated successfully',
      application,
      success: true,
    });

  } catch (error) {
    console.error('Update Status Error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};