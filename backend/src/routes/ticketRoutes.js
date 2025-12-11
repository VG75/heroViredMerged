import express from 'express';
import {
    createTicket,
    getMyTickets,
    getAllTickets,
    getTicketById,
    respondToTicket,
    updateTicketStatus
} from '../controllers/ticketController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createTicket)
    .get(protect, admin, cacheMiddleware(120), getAllTickets); // Cache for 2 min

router.route('/my').get(protect, cacheMiddleware(300), getMyTickets); // Cache for 5 min

router.route('/:id')
    .get(protect, getTicketById);

router.route('/:id/respond')
    .put(protect, admin, respondToTicket);

router.route('/:id/status')
    .put(protect, updateTicketStatus);

export default router;
