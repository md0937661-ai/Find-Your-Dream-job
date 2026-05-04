import multer from 'multer';

const storage = multer.memoryStorage();

// ─────────────────────────────────────────
// Profile Upload Middleware
// ─────────────────────────────────────────
const upload = multer({ storage }).fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

// Error wrapper — MulterError pakdo
export const profileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log('=== MULTER ERROR ===');
      console.log('Error name:', err.name);
      console.log('Error code:', err.code);
      console.log('Error field:', err.field);
      console.log('Error message:', err.message);
      return res.status(400).json({
        message: err.message,
        field: err.field,
        code: err.code,
        success: false,
      });
    }
    next();
  });
};

// ─────────────────────────────────────────
// Logo Upload Middleware
// ─────────────────────────────────────────
const logoUpload2 = multer({ storage }).single('logo');

export const logoUpload = (req, res, next) => {
  logoUpload2(req, res, (err) => {
    if (err) {
      console.log('=== LOGO MULTER ERROR ===');
      console.log('Error:', err.message);
      return res.status(400).json({
        message: err.message,
        success: false,
      });
    }
    next();
  });
};