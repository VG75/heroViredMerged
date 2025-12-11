import express from 'express';
import {
    createApplication,
    getMyApplications,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    withdrawApplication
} from '../controllers/applicationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createApplication)
    .get(protect, admin, cacheMiddleware(120), getAllApplications); // Cache for 2 minutes

router.route('/my').get(protect, cacheMiddleware(300), getMyApplications); // Cache for 5 minutes

router.route('/:id')
    .get(protect, getApplicationById);

router.route('/:id/status')
    .put(protect, admin, updateApplicationStatus);

router.route('/:id/withdraw')
    .put(protect, withdrawApplication);

export default router;
