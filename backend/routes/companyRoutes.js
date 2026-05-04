// import express from 'express';
// import {
//   registerCompany,
//   getCompany,
//   getCompanyById,
//   updateCompany,
// } from '../controllers/companyController.js';

// import isAuthenticated from '../middlewares/authMiddleware.js';
// import { uploadLogo } from '../config/cloudinary.js';

// const router = express.Router();


// router.post('/register', isAuthenticated, registerCompany);



// router.get('/get', isAuthenticated, getCompany);



// router.get('/get/:id', isAuthenticated, getCompanyById);

// router.put(
//   '/update/:id',
//   isAuthenticated,
//   uploadLogo.single('logo'),
//   updateCompany
// );


// export default router;


import express from 'express';
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  getAllCompanies,
} from '../controllers/companyController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';
import { logoUpload } from '../middlewares/multer.js';  // ✅ logoUpload

const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/get', isAuthenticated, getCompany);
router.get('/all', getAllCompanies);
router.get('/get/:id', getCompanyById);
router.put('/update/:id', isAuthenticated, logoUpload, updateCompany);  // ✅

export default router;
