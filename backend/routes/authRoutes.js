// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   updateProfile,
// } from "../controllers/authController.js";

// import isAuthenticated from "../middlewares/authMiddleware.js";
// import { uploadPhoto, uploadResume } from '../config/cloudinary.js';

// const router = express.Router();

// // routes
// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", isAuthenticated, logout);

// router.put(
//   '/profile/update',
//   isAuthenticated,
//   uploadPhoto.fields([
//     { name: 'profilePhoto', maxCount: 1 },
//     { name: 'resume', maxCount: 1 },
//   ]),
//   updateProfile
// );



// export default router;


// import express from 'express';
// import {
//   register,
//   login,
//   logout,
//   updateProfile,
// } from '../controllers/authController.js';
// import isAuthenticated from '../middlewares/authMiddleware.js';
// import { profileUpload } from '../middlewares/multer.js';  // ✅ profileUpload

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/logout', isAuthenticated, logout);
// router.put('/profile/update', isAuthenticated, profileUpload, updateProfile);  // ✅

// export default router;



import express from 'express';
import {
  register,
  login,
  logout,
  updateProfile,
} from '../controllers/authController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';
import { profileUpload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
// router.put(
//   '/profile/update',
//   isAuthenticated,
//   profileUpload,
//   updateProfile
// );


router.put(
  '/profile/update',
  isAuthenticated,
  (req, res, next) => {
    console.log('=== BEFORE MULTER ===');
    console.log('Content-Type:', req.headers['content-type']);
    next();
  },
  profileUpload,
  (req, res, next) => {
    console.log('=== AFTER MULTER ===');
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);
    next();
  },
  updateProfile
);

export default router;