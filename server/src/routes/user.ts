import { Router } from 'express';
import { createUser } from '../controllers/users';
import { createAsync } from '../utils/createAsync';
import { validateUserData } from '../validation/users';
const userRoutes = Router();
userRoutes.post('/', validateUserData, createAsync(createUser));
export default userRoutes;
