import { Router } from 'express';
import ctrlWrapper from "../utils/ctrlWrapper.js"
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, registerUserController, logoutUserController, refreshUserSessionController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController))


export default router;