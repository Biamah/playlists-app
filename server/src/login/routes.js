import { Router } from 'express';
import * as controllers from './controllers.js';
/**
 * Contains all API routes for the application.
 */
const router = Router();

router.post('/', controllers.login);

export default router;
