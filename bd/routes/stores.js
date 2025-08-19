import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import { listStoresForUser, ownerDashboard } from '../controllers/storeController.js';
import { ListingValidators } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', auth, ListingValidators.listStores, validate, listStoresForUser);


router.get('/owner/dashboard', auth, authorize('OWNER'), ownerDashboard);

export default router;
