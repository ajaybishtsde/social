import { Router } from 'express';
import { createAsync } from '../utils/createAsync';
import { requestOTP, verifyEmail, verifyOTP } from '../controllers/auth';
const authRoutes = Router();
authRoutes.get('/verify-email', createAsync(verifyEmail));
authRoutes.post('/request-otp', createAsync(requestOTP));
authRoutes.post('/verify-otp', createAsync(verifyOTP));
export default authRoutes;
