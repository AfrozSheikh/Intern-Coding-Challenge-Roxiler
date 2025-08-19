import { Router } from 'express';
import { authorize } from '../middleware/roles.js';
import { auth } from '../middleware/auth.js';
import {
  dashboardStats, createUser, listUsers, getUser, createStore, listStores
} from '../controllers/adminController.js';
import { AdminValidators, ListingValidators } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.use(auth, authorize('ADMIN'));

router.get('/stats', dashboardStats);

router.post('/users', AdminValidators.createUser, validate, createUser);
router.get('/users', ListingValidators.listUsers, validate, listUsers);
router.get('/users/:id', getUser);

router.post('/stores', AdminValidators.createStore, validate, createStore);
router.get('/stores', ListingValidators.listStores, validate, listStores);

export default router;
