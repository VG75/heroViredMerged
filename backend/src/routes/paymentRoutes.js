import express from 'express';
import {
    createPayment,
    processPayment,
    getMyPayments,
    getAllPayments
} from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createPayment)
    .get(protect, admin, cacheMiddleware(120), getAllPayments);

router.route('/my').get(protect, cacheMiddleware(300), getMyPayments);

router.route('/:id/process').post(protect, processPayment);

export default router;
