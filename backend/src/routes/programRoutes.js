import express from 'express';
import { getAllPrograms } from '../controllers/universityController.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.get('/', cacheMiddleware(600), getAllPrograms); // Cache for 10 min

export default router;
