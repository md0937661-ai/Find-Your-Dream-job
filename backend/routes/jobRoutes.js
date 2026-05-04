import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJob,
} from '../controllers/jobController.js';

import isAuthenticated from '../middlewares/authMiddleware.js';

const router = express.Router();



router.post('/post', isAuthenticated, postJob);



router.get('/get', isAuthenticated, getAllJobs);


 
router.get('/getadminjobs', isAuthenticated, getAdminJobs);



router.get('/get/:id', isAuthenticated, getJobById);



router.delete('/delete/:id', isAuthenticated, deleteJob);


export default router;