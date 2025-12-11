import express from 'express';
import { getAllUniversities, getUniversityById, getAllPrograms } from '../controllers/universityController.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.get('/', cacheMiddleware(600), getAllUniversities); // Cache for 10 min
router.get('/:id', cacheMiddleware(600), getUniversityById);

export default router;
