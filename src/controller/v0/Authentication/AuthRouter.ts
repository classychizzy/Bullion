import { Router, Request, Response } from 'express';
import auth from './AuthController';

const router: Router = Router();

// Login
router.post('/login', auth.login);

// Logout
router.post('/logout', auth.logout);

// Refresh Token
router.get('/refresh', auth.refreshToken);


export const AuthRouter: Router = router;