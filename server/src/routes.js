import { Router } from 'express';
import userRoutes from './user/routes.js'
import loginRoutes from './login/routes.js'

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/users', userRoutes);
router.use('/login', loginRoutes);

export default router;
