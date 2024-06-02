import { Router } from 'express';
import { createAsync } from '../utils/createAsync';
import { verifyEmail } from '../controllers/auth';
const authRoutes = Router();
authRoutes.get('/verify-email', createAsync(verifyEmail));
export default authRoutes;
