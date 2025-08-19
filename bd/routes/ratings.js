import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import { RatingValidators } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';
import { createOrReplaceRating, updateRating } from '../controllers/ratingController.js';

const router = Router();

router.post('/', auth, authorize('USER','ADMIN','OWNER'), RatingValidators.create, validate, createOrReplaceRating);
router.put('/:storeId', auth, authorize('USER','ADMIN','OWNER'), RatingValidators.update, validate, updateRating);

export default router;
